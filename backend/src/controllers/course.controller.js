import { Course } from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllCourses = asyncHandler(async (_, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select('-courseContent -enrolledStudents').populate({ path: 'educator' })
        console.log(courses)

        res.status(200).json(new ApiResponse(200, courses, "All courses data fetched successfully"))
    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching the all courses :: ${error.message} ::`, error))
    }
})

const getCourseById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
           return res.status(400).json(new ApiError(400, `Id missing for fetching the course details`))
        }

        const courseData = await Course.findById(id).populate({ path: 'educator' })

        //Remove lectureUrl if isPreviewFree is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = ""
                }
            })
        })

        res.status(200).json(new ApiResponse(200, courseData, "Course data fetched successfully"))

    } catch (error) {
        res.status(500).json(new ApiError(500, `Server error occured while fetching the all courses :: ${error.message} ::`, error))
    }
})

export { getAllCourses, getCourseById }