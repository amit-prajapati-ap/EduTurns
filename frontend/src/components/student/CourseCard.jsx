import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { calculateRating } from '../../utilityFunctions/index'

const CourseCard = ({course}) => {
  const courseRating = calculateRating(course.courseRatings)

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0,0)} className='borser border-gray-500/30 pb-6 overflow-hidden rounded-lg shadow-2xl hover:shadow-md hover:shadow-cyan-300 transition-all duration-300 hover:scale-105'>
      <img src={course?.courseThumbnail} className='w-full' />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course?.courseTitle}</h3>
        <p className='text-gray-500'>{course?.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{courseRating}</p>
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(courseRating) ? assets.star : assets.star_blank} className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>{course.courseRatings.length}</p>
        </div>
        <p className='text-base font-semibold text-gray-800'>₹{(course?.coursePrice - (course?.discount * course?.coursePrice / 100)).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard
