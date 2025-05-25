import React from 'react';
import educationImage from '../assets/education_image.jpg'
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row max-w-[1400px] 2xl:mx-auto md:mx-16 mx-8 my-18 gap-10 relative'>
        <div className='flex flex-col md:items-start items-center gap-8 w-full z-50'>
            <h2 className='text-[40px] leading-12 font-bold text-blue-900 text-center md:text-left'><span className='text-blue-600'>Empower your future</span> with the courses designed to fit your choice.</h2>
            <p className='text-gray-900 text-center md:text-left'>EduTurns is a modern, full-stack education platform, designed to simplify and enhance digital learning. It features secure authentication, seamless payment integration, and an intuitive UI for both students and educators. With real-time data handling and a responsive design, EduTurns empowers users to explore, enroll, and engage with educational content effortlessly.</p>
            <Link to={'/course-list'} className='px-4 py-2 w-28 text-white rounded-md bg-purple-700 hover:opacity-90 transition-opacity duration-200'>Enroll Now</Link>
        </div>
        <div className='sm:w-[1000px] h-[400px] max-w-[400px] sm:max-w-full rounded-full border border-purple-500 overflow-hidden p-8 mx-auto'>
            <img src={educationImage} alt="Educational Image" className='object-cover rounded-full w-full h-full' />
        </div>
            <div className='lg:block hidden absolute w-8 h-8 bg-purple-600 rounded-full right-1/2 z-10'></div>
            <div className='lg:block hidden absolute w-8 h-8 bg-purple-600 rounded-full right-0 bottom-0'></div>
    </div>
  );
};

export default AboutUs;
