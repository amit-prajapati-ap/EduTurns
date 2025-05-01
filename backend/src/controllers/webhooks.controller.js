import { Webhook } from 'svix'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

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

export { clerkWebhooks }