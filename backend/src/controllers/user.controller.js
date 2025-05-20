import { CURRENCY } from "../constants.js";
import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.models.js";
import { Purchase } from "../models/purchase.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from 'stripe'

const getUserData = asyncHandler(async (req, res) => {
    try {
        const userid = req.auth.userId

        const user = await User.findById(userid)

        if (!user) {
            return res.status(404).json(new ApiError(404, `User Not Found`))
        }

        res.status(200).json(new ApiResponse(200, user, "User details fetched successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching user details :: ${error.message} ::`, error))
    }
})

const getUserEnrolledCourses = asyncHandler(async (req, res) => {
    try {
        const userId = req?.auth?.userId
        if (!userId) {
            return res.status(401).json(new ApiError(401, "Unauthorized Access"))
        }

        const userData = await User.findById(userId).populate('enrolledCourses')

        const enrolledCoursesData = {
            enrolledCourses: userData.enrolledCourses
        }

        res.status(200).json(new ApiResponse(200, enrolledCoursesData, "User enrolled courses data fetched successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching user enrolled courses :: ${error.message} ::`, error))
    }
})

const purchaseCourse = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId;
        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)

        if (!userData || !courseData) {
            return res.status(404).json(new ApiError(404, `User Data or Course Data Not Found`))
        }

        const purchaseData = {
            courseId: courseData._id,
            userId: userId,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }

        const newPurchase = await Purchase.create(purchaseData)

        // Stripe gateway initialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

        const currency = CURRENCY.toLowerCase()

        //Creating line items to for Stripe
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })
        if (!session) {
            return res.status(501).json(new ApiError(501, `Purchase failed and session not be created`))
        }

        res.status(200).json(new ApiResponse(200, { session_url: session.url }, "Course Purchased Successfully"))

    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while purchasing the course :: ${error.message} ::`, error))
    }
})

// Update user course progress
const updateUserCourseProgress = asyncHandler(async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.status(201).json(new ApiResponse(201, {}, "Lecture already completed"))
            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({ userId, courseId, lectureCompleted: [lectureId] })
        }

        res.status(200).json(new ApiResponse(200, {}, "User course progress updated!"))

    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while updating the user course progress :: ${error.message} ::`, error))
    }
})

//Get user course progress
const getUserCourseProgress = asyncHandler(async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        res.status(200).json(new ApiResponse(200, progressData, "User course progress fetched successfully!"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occuredwhile fetching the user course progress :: ${error.message} ::`, error))
    }
})

//Add user ratings to course
const userRating = asyncHandler(async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, rating } = req.body

        if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json(new ApiError(400, `Bad Request! Invalid Details`))
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json(new ApiError(400, `Bad Request! Course not found`))
        }

        const user = await User.findById(userId)

        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.status(400).json(new ApiError(400, `Bad Request! User has not purchased this course`))
        }

        const existingRatingIndex = course.courseRatings.findIndex(rating => rating.userId === userId)

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating
        } else {
            course.courseRatings.push({ userId, rating })
        }

        await course.save()

        res.status(200).json(new ApiResponse(200, {}, "User rating added successfully!"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while updating the user ratings :: ${error.message} ::`, error))
    }
})

export { getUserData, getUserEnrolledCourses, purchaseCourse, updateUserCourseProgress, getUserCourseProgress, userRating }