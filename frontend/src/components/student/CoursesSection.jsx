import React from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { useSelector } from 'react-redux'

const CoursesSection = () => {
  const allCourses = useSelector((state) => state.appContext.appData.allCourses)

  return (
    <div className='py-16 md:px-40 px-8'>

      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>

      <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

      <div className='grid gridAuto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course, index) => (<CourseCard key={index} course={course}/>))}
      </div>

      <Link to={'/course-list'} onClick={() => scrollTo(0,0)} className='text-gray-500 border px-10 py-3 rounded hover:bg-gray-50 transition-all duration-300 border-gray-500/30'>Show all courses</Link>

    </div>
  )
}

export default CoursesSection
