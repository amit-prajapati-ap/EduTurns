import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from '../../components/student/Loading'
import { calculateChapterTime, calculateCourseDuration, calculateNoOfLectures, calculateRating } from '../../utilityFunctions'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import { enrollCourse, fetchCourseData } from '../../utilityFunctions/apiCalls'
import DataNotFound from '../../components/DataNotFound'

const CourseDetails = () => {
  const {id} = useParams()
  const [courseData, setCourseData] = useState(null)
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const [openSection, setOpenSection] = useState({})
  let courseRating = null
  const {userData, getToken } = useSelector(state => state.appContext.appData)

  if (courseData) {
    courseRating = calculateRating(courseData?.courseRatings)
  }

  const [dataFound, setDataFound] = useState(true)
  
    setTimeout(() => {
      if (!courseData) {
        setDataFound(false)
      }
    }, 5000);

  const toggleSection = (index) => {
    setOpenSection((prev) => (
      {...prev, [index]: !prev[index]}
    ))
  }
  
  const fetchCourseDataMehod = () => {
    fetchCourseData(id).then(res => {
      setCourseData(res)
    })
  }
  const enrollCourseNow = () => {
    enrollCourse({isAlreadyEnrolled, userData, token: getToken, courseData})
  }
  useEffect(() => {
    fetchCourseDataMehod()
  }, [])

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  }, [userData, courseData])

  return dataFound ? (courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between px-8 xl:px-36 md:pt-10 pt-5 text-left min-h-[80vh]'>
        <div className='h-[500px] absolute top-0 left-0 w-full z-1 bg-gradient-to-b from-cyan-100/70'></div>      

        {/* Left Column */}
        <div className='max-w-xl z-10 text-gray-500'>

          <h1 className='md:course-details-heading-large course-details-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>

          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html: courseData.courseDescription.slice(0, 200)}}></p>

          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{courseRating ? courseRating : ''}</p>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(courseRating ? courseRating : 0) ? assets.star : assets.star_blank} className='w-3.5 h-3.5' />
              ))}
            </div>
            <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
            <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>

          <p className='text-sm'>Course by <span className='text-blue-600 underline'>{courseData.educator.name}</span></p>

          <div className='pt-8 text-gray-800'>
              <h2 className='font-semibold text-xl'>Course Structure</h2>
              <div className='pt-5'>
                {courseData.courseContent.map((chapter, index) => (
                  <div className='border border-gray-300 bg-white mb-2 rounded' key={index}>
                    <div onClick={() => toggleSection(index)} className='flex items-center justify-between px-4 py-3 cursor-pointer select-none'>
                      <div className='flex items-center gap-2'>
                        <img src={assets.down_arrow_icon} className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} />
                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                      </div>
                      <p className='text-sm md:text-medium'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={i} className='flex items-start gap-2 py-1'>
                            <img src={assets.play_icon} className='w-4 h-4 mt-1' />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                              <p className='mt-1'>{lecture.lectureTitle}</p>
                              <div className='flex gap-1'>
                                {lecture.isPreviewFree && <p onClick={() => setPlayerData({
                                  videoId: lecture.lectureUrl.split('/').pop()
                                })} className='text-blue-500 cursor-pointer hover:underline'>Preview</p>}
                                <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, {units: ['h', 'm']})}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
            <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html: courseData.courseDescription}}></p>
          </div>

        </div>

        {/* Right Column */}
        <div className='shadow-custom-card z-10 rounded-t md:rounded-none overflow-hidden w-[50%] bg-white min-w-[300px] sm:min-w-[420px]'>
          {
            playerData ? <YouTube videoId={playerData.videoId} opts={{playerVars: {
              autoplay: 1
            }}} iframeClassName='w-full aspect-video' /> : <img src={courseData.courseThumbnail} />
          }
          <div className='p-5'>
            <div className='flex items-center gap-2'>
              <img src={assets.time_left_clock_icon} className='w-3.5' />
              <p className='text-red-500 mt-1'><span className='font-medium'>5 days</span> left at this price!</p>
            </div>

            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>₹{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>
              <p className='md:text-lg text-gray-500 line-through'>₹{(courseData.coursePrice).toFixed(2)}</p>
              <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
            </div>

            <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
              <div className='flex items-center gap-1'>
                <img src={assets.star} />
                <p className='mt-1'>{calculateRating(courseData.courseRatings)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500/40'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} />
                <p className='mt-1'>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className='h-4 w-px bg-gray-500/40'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} />
                <p className='mt-0.5'>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button onClick={enrollCourseNow} className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium cursor-pointer'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>

            <div className='pt-6'>
              <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
              <ul className='ml-4 pt-2 text-sm md:text-default list-disc text-gray-500'>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Loading/>) : <DataNotFound/>
}

export default CourseDetails
