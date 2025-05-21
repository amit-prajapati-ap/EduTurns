import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import SearchBar from '../../components/student/SearchBar'
import CourseCard from '../../components/student/CourseCard'
import { fetchAllCourses } from '../../utilityFunctions/apiCalls'
import Loading from '../../components/student/Loading'
import DataNotFound from '../../components/DataNotFound'

const CoursesList = () => {
  const {input} = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])
  const [allCourses, setAllCourses] = useState(null)
  const location = useLocation();
  const [dataFound, setDataFound] = useState(true)

  useEffect(() => {
    // Only run if we're on the home page
    if (location.pathname === '/course-list') {
      fetchAllCourses().then((res) => {
        setAllCourses(res);
      });
    }
  }, [location.pathname]);

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

  useEffect(() => {
      const timer = setTimeout(() => {
        if (!allCourses || allCourses.length === 0) {
          setDataFound(false);
        }
      }, 5000);
  
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }, [allCourses]);

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

        {dataFound ? (allCourses && allCourses.length != 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-16 gap-5 px-2 md:p-0'>
          {filteredCourse.map((course, index) => <CourseCard key={index} course={course} isClickable={true}/>)}
        </div> : <Loading/>) : <DataNotFound/>}
      </div>
    </>
  )
}

export default CoursesList
