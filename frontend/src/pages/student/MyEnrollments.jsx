import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { calculateCourseDuration } from '../../utilityFunctions/calculateCourseDuration'
import { useNavigate } from 'react-router-dom'
import {Line} from 'rc-progress'
import { fetchCoursesProgress, fetchUserEnrolledCourses } from '../../utilityFunctions/apiCalls'
import Loading from '../../components/student/Loading'

const MyEnrollments = () => {
  const { getToken } = useSelector((state) => state.appContext.appData)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [progressArray, setProgressArray] = useState(null)
  const navigate = useNavigate()

  const checkLectureCompleted = (index) => {
    return progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1;
  }

  React.useEffect(() => {
    fetchUserEnrolledCourses(getToken).then(res => {
      setEnrolledCourses(res)
    })
  },[])
  React.useEffect(() => {
    if (enrolledCourses?.length > 0) {
      fetchCoursesProgress({token: getToken, enrolledCourses}).then(res => {
        setProgressArray(res)
      })
    }
  }, [enrolledCourses])

   return progressArray ? (
    <div className='xl:px-36 px-8 pt-10 min-h-[80vh]'>
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border border-gray-500/20 mt-10'>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>

        <tbody className='text-gray-700'>
          {enrolledCourses?.map((course, index) => (
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={course.courseThumbnail} className='w-14 sm:w-24
                 md:w-28' />
                 <div className='flex-1'>
                  <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                  <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />
                 </div>
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {calculateCourseDuration(course)}
              </td>
              <td className='px-4 py-3 max-sm:hidden'>
                {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span>
              </td>
              <td className='px-4 py-3 max-sm:text-right'>
                <button onClick={() => navigate('/player/' + course._id)} className={`px-3 w-30 sm:px-5 py-1.5 sm:py-2  ${checkLectureCompleted(index) ? 'bg-green-500' : 'bg-yellow-500/80'} rounded-sm cursor-pointer max-sm:text-xs text-white`}>
                {checkLectureCompleted(index) ? 'Completed' : 'On Going'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <Loading/>
}

export default MyEnrollments
