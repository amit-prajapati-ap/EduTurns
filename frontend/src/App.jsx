import React from "react";
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
  return (
    <div className="min-h-screen bg-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
