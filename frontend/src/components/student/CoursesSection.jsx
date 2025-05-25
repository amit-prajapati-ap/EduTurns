import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchAllCourses } from "../../utilityFunctions/apiCalls.js";
import SliderComponent from "../SliderComponent.jsx";
import Loading from "./Loading.jsx";

const CoursesSection = () => {
  const [allCourses, setAllCourses] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Only run if we're on the home page
    if (location.pathname === "/") {
      fetchAllCourses().then((res) => {
        setAllCourses(res);
      });
    }
  }, [location.pathname]);

  return (
    <div className="py-16 lg:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>

      <p className="text-sm md:text-base text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      {allCourses && allCourses.length != 0 ? (
        <>
          <div className="grid gridAuto px-4 md:px-0 my-16 gap-4">
            <SliderComponent allCourses={allCourses} />
          </div>
          <Link
            to={"/course-list"}
            onClick={() => scrollTo(0, 0)}
            className="text-gray-500 border px-10 py-3 rounded hover:bg-gray-50 transition-all duration-300 border-gray-500/30"
          >
            Show all courses
          </Link>
        </>
      ) : (
        <div className="pt-12">
          <Loading height={"200px"} />
        </div>
      )}
    </div>
  );
};

export default CoursesSection;
