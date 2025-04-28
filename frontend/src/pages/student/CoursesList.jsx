import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SearchBar from '../../components/student/SearchBar'
import { useSelector } from 'react-redux'
import CourseCard from '../../components/student/CourseCard'

const CoursesList = () => {
  const {input} = useParams()
  const allCourses = useSelector((state) => state.appContext.appData.allCourses)
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      input ? 
        setFilteredCourse(
          tempCourses.filter((item => item.courseTitle.toLowerCase().includes(input.toLowerCase())))
        )
      :
        setFilteredCourse(tempCourses)
      ;
    }
  }, [allCourses, input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left min-h-[80vh]'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'><Link to={'/'} className='text-blue-500 cursor-pointer hover:underline'>Home</Link> / <span>Course List</span></p>
          </div>
          <SearchBar data={input}/>
        </div>

        {
          input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 border-gray-400/70'>
            <p>{input}</p>
            <Link to={'/course-list'} className='cursor-pointer text-red-600'>X</Link>
          </div>
        }

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-16 gap-5 px-2 md:p-0'>
          {filteredCourse.map((course, index) => <CourseCard key={index} course={course}/>)}
        </div>
      </div>
    </>
  )
}

export default CoursesList
