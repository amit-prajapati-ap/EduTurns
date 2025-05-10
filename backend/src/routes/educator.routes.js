import { Router } from "express";
import { addCourse, getEducatorCourses, updateRoleToEducator } from "../controllers/educator.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { protectEducator } from "../middlewares/auth.middleware.js";

const router = Router()

// Add educator role
router.route('/update-role').get(updateRoleToEducator)

router.route('/add-course').post(upload.fields([{ name: 'courseThumbnail', maxCount: 1 }]), protectEducator,
addCourse)

router.route('/courses').get(protectEducator, getEducatorCourses)

export default router