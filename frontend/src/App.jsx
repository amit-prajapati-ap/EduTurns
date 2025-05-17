import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Layout from "./components/Layout";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import PageNotFound from "./components/PageNotFound";
import "quill/dist/quill.snow.css";
import {
  setAllCourses,
  setIsEducator,
  setToken,
  setUserData,
  setUserEnrolledCourses,
} from "./features/AppContextSlice.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourses,
  fetchUserData,
  fetchUserEnrolledCourses,
} from "./utilityFunctions/apiCalls.js";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/course-list",
    element: (
      <Layout>
        <CoursesList />
      </Layout>
    ),
  },
  {
    path: "/course-list/:input",
    element: (
      <Layout>
        <CoursesList />
      </Layout>
    ),
  },
  {
    path: "/course/:id",
    element: (
      <Layout>
        <CourseDetails />
      </Layout>
    ),
  },
  {
    path: "/my-enrollments",
    element: (
      <Layout>
        <MyEnrollments />
      </Layout>
    ),
  },
  {
    path: "/player/:courseId",
    element: (
      <Layout>
        <Player />
      </Layout>
    ),
  },
  {
    path: "/loading/:path",
    element: (
      <Layout>
        <Loading />
      </Layout>
    ),
  },
  {
    path: "/educator",
    element: (
      <Layout>
        <Educator />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "my-courses",
        element: <MyCourses />,
      },
      {
        path: "student-enrolled",
        element: <StudentsEnrolled />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const { getToken } = useAuth();
  const { user } = useUser();
  const fetchAndSetToken = () => {
    return getToken().catch((error) => {
      console.error("Failed to fetch token:", error);
    });
  };

  fetchAndSetToken().then((token) => {
    if (token) {
      dispatch(setToken({ token, user }));
    }
  });

  //API Calls without token
  fetchAllCourses().then((res) => {
    dispatch(setAllCourses({ allCourses: res }));
  });

  //API Calls with token
  const token = useSelector((state) => state.appContext.appData.getToken);
  useEffect(() => {
    if (token) {
      fetchUserData(token).then((res) => {
        if (user.publicMetadata.role === "educator") {
          dispatch(setIsEducator(true));
        }
        dispatch(setUserData(res));
      });

      fetchUserEnrolledCourses(token).then((res) => {
        dispatch(setUserEnrolledCourses(res));
      });
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
