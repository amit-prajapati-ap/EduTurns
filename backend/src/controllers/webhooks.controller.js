import { Webhook } from 'svix'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import Stripe from 'stripe'
import { Purchase } from '../models/purchase.model.js'
import { Course } from '../models/course.model.js'

//API Controller Function to Manage Clerk user with db

const clerkWebhooks = asyncHandler(async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body;

        switch (type) {
            case 'user.created':
                {
                    const userData = {
                        _id: data.id,
                        email: data.email_addresses[0].email_address,
                        name: data.first_name + (data.last_name != null ? ' ' + data.last_name : ''),
                        imageUrl: data.image_url
                    }
                    await User.create(userData)
                    res.json(new ApiResponse(200, {}, "User created Successfully"))
                    break;
                }
            case 'user.updated':
                {
                    const userData = {
                        email: data.email_addresses[0].email_address,
                        name: data.first_name + (data.last_name != null ? ' ' + data.last_name : ''),
                        imageUrl: data.image_url
                    }
                    await User.findByIdAndUpdate(data.id, userData)
                    res.json(new ApiResponse(200, {}, "User updated Successfully"))
                    break;
                }
            case 'user.deleted':
                {
                    await User.findByIdAndDelete(data.id)
                    res.json(new ApiResponse(200, {}, "User deleted Successfully"))
                    break;
                }

            default:
                break;
        }
    } catch (error) {
        res.json(new ApiError(500, error.message, Array(error)))
    }
})

const stripeWebhooks = async (request, response) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = Stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id

            const session = await stripeInstance.checkout.sessions.list({ payment_intent: paymentIntentId })

            const { purchaseId } = session.data[0].metadata

            const purchaseData = await Purchase.findById(purchaseId)
            const userData = await User.findById(purchaseData.userId)
            const courseData = await Course.findById(purchaseData.courseId.toString())

            courseData.enrolledStudents.push(userData)
            await courseData.save()

            userData.enrolledCourses.push(courseData._id)
            await userData.save()

            purchaseData.status = 'completed'
            await purchaseData.save()

            break;
        }
        case 'payment_intent.failed': {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id

            const session = await stripeInstance.checkout.sessions.list({ payment_intent: paymentIntentId })

            const { purchaseId } = session.data[0].metadata

            const purchaseData = await Purchase.findById(purchaseId)

            purchaseData.status = 'failed'
            await purchaseData.save()

            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
}

export { clerkWebhooks, stripeWebhooks }