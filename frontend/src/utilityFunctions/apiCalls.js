import axios from 'axios'
import { toast } from 'react-toastify'
import { calculateNoOfLectures } from './calculateNoOfLectures'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const fetchAllCourses = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/v1/course/all')

        if (data.statusCode == 200) {
            return data.data
        } else {
            toast.error(data.message)
            return []
        }
    } catch (error) {
        toast.error(error.message)
        return []
    }
}

export const fetchUserData = async (token) => {
    try {
        const { data } = await axios.get(backendUrl + '/api/v1/user/data', { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode == 200) {
            return data.data
        } else {
            toast.error(data.message)
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const fetchUserEnrolledCourses = async (token) => {
    try {
        const { data } = await axios.get(backendUrl + '/api/v1/user/enrolled-courses', { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode == 200) {
            return data.data.enrolledCourses.reverse()
        } else {
            toast.error(data.message)
            return null
        }
    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const becomeEducator = async (token, isEducator, navigate) => {
    try {
        if (isEducator) {
            navigate('/educator')
            return true
        } else {
            const { data } = await axios.get(backendUrl + '/api/v1/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })

            if (data.statusCode == 200) {
                toast.success(data.message)
                return true
            } else {
                toast.error(data.message)
                return false
            }
        }
    } catch (error) {
        toast.error(error.message)
        return false
    }
}

export const fetchCourseData = async (id) => {
    try {
        const { data } = await axios.get(backendUrl + '/api/v1/course/' + id)

        if (data.statusCode == 200) {
            return data.data
        } else {
            toast.error(data.message)
            return {}
        }

    } catch (error) {
        toast.error(error.message)
        return {}
    }
}

export const enrollCourse = async ({ userData, isAlreadyEnrolled, token, courseData }) => {
    try {
        if (!userData) {
            toast.warn("Login to Enroll")
            return
        }

        if (isAlreadyEnrolled) {
            toast.warn("Already Enrolled")
            return
        }

        const { data } = await axios.post(backendUrl + '/api/v1/user/purchase', { courseId: courseData._id }, { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode == 200) {
            const { session_url } = data.data
            console.log(session_url)
            window.location.replace(session_url)
        } else {
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}

export const fetchCoursesProgress = async ({ token, enrolledCourses }) => {
    try {

        const tempProgressArray = await Promise.all(
            enrolledCourses.map(async (course) => {
                const { data } = await axios.post(backendUrl + `/api/v1/user/get-course-progress`, { courseId: course._id }, { headers: { Authorization: `Bearer ${token}` } })

                let totalLectures = calculateNoOfLectures(course)
                const lectureCompleted = (data.data && data.data) ? data.data.lectureCompleted.length : 0

                return { totalLectures, lectureCompleted }
            })
        )
        return tempProgressArray

    } catch (error) {
        toast.error(error.message)
        return []
    }
}

export const fetchSingleCourseProgress = async ({ token, courseId }) => {
    try {
        const { data } = await axios.post(backendUrl + `/api/v1/user/get-course-progress`, { courseId }, { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode === 200) {
            return data.data
        } else {
            toast.error(data.message)
            return null
        }

    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const markLectureAsCompleted = async ({ token, lectureId, courseId }) => {
    try {
        const { data } = await axios.post(backendUrl + '/api/v1/user/update-course-progress', { courseId, lectureId }, { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode === 200) {
            toast.success(data.message)
            const response = fetchSingleCourseProgress({ token, courseId }).then(res => {
                return res
            })
            return response
        } else {
            toast.error(data.message)
            return null
        }

    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const rateTheCourse = async ({ token, courseId, rating }) => {
    try {
        const { data } = await axios.post(backendUrl + '/api/v1/user/add-rating', { courseId, rating }, { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode === 200) {
            toast.success("User rating updated successfully")
            const response = fetchUserEnrolledCourses(token).then(res => {
                return res
            })

            return response
        } else {
            toast.error(data.message)
            return null
        }

    } catch (error) {
        toast.error(error.message)
        return null
    }
}

export const addNewCourse = async({courseData, image, token}) => {
    try {
        if (!image) {
            toast.warn("Thumbnail Not Selected")
            return false
        }
        const formData = new FormData()
        formData.append('courseData', JSON.stringify(courseData))
        formData.append('courseThumbnail', image)

        const {data} = await axios.post(backendUrl + '/api/v1/educator/add-course', formData, { headers: { Authorization: `Bearer ${token}` } })

        if (data.statusCode === 200) {
            toast.success(data.message)
            return true
        } else {
            toast.error(data.message)
            return false
        }
    } catch (error) {
        toast.error(error.message)
        return false
    }
}

export const fetchEducatorCourses = async(token) => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/educator/courses', {headers: {Authorization: `Bearer ${token}`}})

        if (data.statusCode === 200) {
            return data.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const fetchEnrolledUsers = async({token}) => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/educator/enrolled-students', {headers: {Authorization: `Bearer ${token}`}})

        if (data.statusCode === 200) {
            return data.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const fetchDashboardData = async({token}) => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/educator/dashboard', {headers: {Authorization: `Bearer ${token}`}})

        if (data.statusCode === 200) {
            return data.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}