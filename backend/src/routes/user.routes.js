import { Router } from "express";
import { getUserData, getUserEnrolledCourses, purchaseCourse } from "../controllers/user.controller.js";

const router = Router()

router.route('/data').get(getUserData)
router.route('/enrolled-courses').get(getUserEnrolledCourses)
router.route('/purchase').post(purchaseCourse)

export default router