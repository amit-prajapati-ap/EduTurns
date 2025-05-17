import axios from 'axios'
import { toast } from 'react-toastify'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const fetchAllCourses = async() => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/course/all')

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

export const fetchUserData = async(token) => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/user/data', {headers: {Authorization: `Bearer ${token}`}})

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

export const fetchUserEnrolledCourses = async(token) => {
    try {
        const {data} = await axios.get(backendUrl + '/api/v1/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}})

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