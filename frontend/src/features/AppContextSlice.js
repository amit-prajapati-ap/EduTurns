import { createSlice } from "@reduxjs/toolkit";
import { assets } from "../assets/assets";

const initialState = {
  appData: {
    allCourses: [],
    isEducator: false,
    userData: null,
    enrolledCourses: [],
    user: undefined,
    getToken: undefined,
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
    setUserData: (state, action) => {
      state.appData.userData = action.payload
    },
    setAllCourses: (state, action) => {
      state.appData.allCourses = action.payload.allCourses
    },
    setUserEnrolledCourses: (state, action) => {
      state.appData.enrolledCourses = action.payload
    },
    setToken: (state, { payload }) => {
      state.appData.user = payload.user;
      state.appData.getToken = payload.token;
    }
  },
});

export const { setIsEducator, setUserEnrolledCourses, setToken, setAllCourses, setUserData } = AppContextSlice.actions;

export default AppContextSlice.reducer;
