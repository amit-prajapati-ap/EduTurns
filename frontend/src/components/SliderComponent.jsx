import React, { useState } from "react";
import Slider from "react-slick";
import CourseCard from "./student/CourseCard";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black", // Tailwind gray-200
        borderRadius: "9999px",
        width: "40px",
        height: "40px",
        right: "-20px", // adjust spacing from content
      }}
      onClick={onClick}
    >
      <FaChevronRight color="#000" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        borderRadius: "9999px",
        width: "40px",
        height: "40px",
        left: "-20px",
        zIndex: 10
      }}
      onClick={onClick}
    >
      <FaChevronLeft color="white" />
    </div>
  );
}


function CenterMode({ allCourses }) {
    const [centerIndex, setCenterIndex] = useState(0);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: allCourses.length > 3,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      // Set center slide index
      setCenterIndex(newIndex);
    },
    responsive: [
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      centerPadding: "30px",
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      centerPadding: "40px",
    },
  },
]
  };

  return (
    <div className="slider-container custom-slider">
      <Slider {...settings}>
        {allCourses.slice(0, 4).map((course, index) => {
          const isCenter = index === centerIndex; // adjust offset depending on slick behavior
          return (
            <div className="px-2" key={index}>
              <div>
                <CourseCard course={course} isClickable={isCenter} />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CenterMode;
