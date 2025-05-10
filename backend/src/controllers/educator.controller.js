import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clerkClient } from '@clerk/express'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Purchase } from "../models/purchase.model.js";
import { User } from '../models/user.model.js'

const updateRoleToEducator = asyncHandler(async (req, res) => {
    try {
        const userId = req.auth.userId || req.headers.userId
        console.log(userId)

        if (!userId) {
            throw new ApiError(400, "Unauthorized user")
        }

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: "educator",
            },
        });

        res.status(200).json(new ApiResponse(200, {}, 'You can publish a course now'))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while updating the educator role :: ${error.message} ::`, error))
    }
})

const addCourse = async (req, res) => {
    try {
        const { courseData } = req?.body || { courseData: "" }
        const educatorId = req.auth.userId
        let courseThumbnailLocalPath

        if (!courseData) {
            throw new ApiError(400, "Course data is required")
        }

        if (req.files && req.files.courseThumbnail && req.files.courseThumbnail[0].path) {
            courseThumbnailLocalPath = req.files?.courseThumbnail[0]?.path
        }

        if (!courseThumbnailLocalPath) {
            throw new ApiError(400, "Thumbnail not attached")
        }

        const parsedCourseData = await JSON.parse(courseData)

        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)

        const courseThumbnail = await uploadOnCloudinary(courseThumbnailLocalPath)

        if (!courseThumbnail) {
            throw new ApiError(400, "Error while uploading course thumbnail")
        }

        newCourse.courseThumbnail = courseThumbnail.url

        await newCourse.save()

        res.status(200).json(new ApiResponse(200, newCourse, "Course added successfully"))

    } catch (error) {
        throw new ApiError(500, `Server error occur while adding the course :: ${error.message} ::`, error)
    }
}

const getEducatorCourses = asyncHandler(async (req, res) => {
    try {
        const educator = req.auth.userId

        const courses = await Course.find({ educator })

        res.status(200).json(new ApiResponse(200, courses, "Courses fetched successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching the course :: ${error.message} ::`, error))
    }
})

const getEducatorDashboardData = asyncHandler(async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const totalCourses = courses.length
        const courseIds = courses.map(course => course._id)

        //Calculate total earnings from purchase
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed',
        })

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase, 0)

        // Collect unique enrolled student IDs with their course titles
        const ernrolledStudentData = []
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')
            students.forEach(student => {
                ernrolledStudentData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            });
        }

        const dashboardData = {
            totalEarnings,
            ernrolledStudentData,
            totalCourses
        }

        res.status(200).json(new ApiResponse(200, dashboardData, "Educator dashboard data fetched successfully"))

    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching the data for educator dashboard :: ${error.message} ::`, error))
    }
})

export { updateRoleToEducator, addCourse, getEducatorCourses, getEducatorDashboardData }