import { createSlice } from "@reduxjs/toolkit";
import { assets, dummyCourses } from "../assets/assets";

const initialState = {
    appData: {
        allCourses: dummyCourses,
        isEducator: true,
        enrolledCourses: dummyCourses,
        menuItems: [
            {
              name: 'Dashboard', path: '/educator', icon: assets.home_icon
            },
            {
              name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon
            },
            {
              name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon
            },
            {
              name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon
            },
          ]
    }
}

const AppContextSlice = createSlice({
    name: "app",
    initialState: initialState,

    reducers: { 
        setIsEducator: (state, action) => {
            state.appData.isEducator = action.payload
        },
        fetchUserEnrolledCourses: (state, action) => {
            state.appData.enrolledCourses = action.payload
        }
     },
});

export const { setIsEducator, fetchUserEnrolledCourses } = AppContextSlice.actions;

export default AppContextSlice.reducer;
