import React, { useEffect, useState } from "react";
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
        width: "120px",
        height: "80px",
        right: "-65px", 
        cursor: "pointer",
        top:"35%"
      }}
      onClick={onClick}
    >
      <FaChevronRight color="gray" size={50} />
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
        width: "120px",
        height: "80px",
        left: "-85px", 
        cursor: "pointer",
        top:"35%"
      }}
      onClick={onClick}
    >
      <FaChevronLeft color="gray" size={50} />
    </div>
  );
}

function CenterMode({ allCourses }) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [slides, setSlides] = useState(0);
  useEffect(() => {
    if (allCourses.length === 1) {
      setSlides(1);
    } else if (allCourses.length === 2) {
      setSlides(2);
    } else {
      setSlides(3);
    }
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: slides,
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
        breakpoint: 685,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "5px",
        },
      },
    ],
  };

  return (
    <div className="slider-container custom-slider mb-4 max-w-[1200px]">
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
