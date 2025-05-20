import { Router } from "express";
import { getUserCourseProgress, getUserData, getUserEnrolledCourses, purchaseCourse, updateUserCourseProgress, userRating } from "../controllers/user.controller.js";

const router = Router()

router.route('/data').get(getUserData)
router.route('/enrolled-courses').get(getUserEnrolledCourses)
router.route('/get-course-progress').post(getUserCourseProgress)

router.route('/update-course-progress').post(updateUserCourseProgress)
router.route('/purchase').post(purchaseCourse)
router.route('/add-rating').post(userRating)

export default router