import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./student/Navbar";
import Footer from "./student/Footer";

const PageNotFound = () => {
  return (
    <div>
      <Navbar/>
      <div className="bg-white flex justify-center items-center h-[80vh]">
        <div className="flex flex-col items-center justify-center bg-white text-center px-4">
          <h1 className="text-8xl font-bold text-gray-900 flex items-center justify-center">
            404
            <span className="ml-2 text-green-500">🌿</span>
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Oops... This page was not found.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Not all who wander are lost. But in this case, it looks like you
            are! This page does not exist or is lost.
          </p>
          <p className="text-sm text-gray-500">
            Don’t feel bad, let’s help you get back on track!
          </p>

          <Link
            to="/"
            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-300"
          >
            Head Back to Home Page
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PageNotFound;
