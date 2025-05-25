import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { calculateRating } from "../../utilityFunctions/index";

const CourseCard = ({ course, isClickable }) => {
  const courseRating = calculateRating(course.courseRatings);

  const content = (
    <div className="p-4">
      <img src={course?.courseThumbnail} className="w-full h-50 2xl:h-60" />
      <div className="p-3 text-left h-30 flex flex-col justify-between">
        <h3 className="text-base font-semibold line-clamp-1">
          {course?.courseTitle}
        </h3>
        <p className="text-gray-500 line-clamp-1">{course?.educator.name}</p>
        <div className="flex items-center space-x-2">
          <p>{courseRating}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(courseRating) ? assets.star : assets.star_blank
                }
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          ₹
          {(
            course?.coursePrice -
            (course?.discount * course?.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );

  return isClickable ? (
    <Link
      to={"/course/" + course._id}
      onClick={() => scrollTo(0, 0)}
    ><div className="borser pt-4 border-gray-500/30 overflow-hidden rounded-lg transition-all duration-300">{content}</div></Link>
  ) : (
    <div className="pointer-events-none">{content}</div>
  );
};

export default CourseCard;
