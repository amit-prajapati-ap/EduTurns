import { CURRENCY } from "../constants.js";
import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from 'stripe'

const getUserData = asyncHandler(async(req,res) => {
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

const getUserEnrolledCourses = asyncHandler(async(req,res) => {
    try {
        const userId = req.auth.userId

        const userData = await User.findById(userId).populate('enrolledCourses')

        const enrolledCoursesData = {
            enrolledCourses: userData.enrolledCourses
        }

        res.status(200).json(new ApiResponse(200, enrolledCoursesData, "User enrolled courses data fetched successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching user enrolled courses :: ${error.message} ::`, error))
    }
})

export {getUserData, getUserEnrolledCourses, purchaseCourse}