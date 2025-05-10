import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Home = () => {
  const {user, getToken} = useSelector(
    (state) => state.appContext.appData
  );

  const logToken = async () => {  
    console.log(user?.id)
    console.log(getToken)
  };
  useEffect(() => {
     if (user) {
      logToken()
     }
  }, [user])

  return (
    <div className='flex flex-col items-center text-center space-y-7'>
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TestimonialsSection/>
      <CallToAction/>
    </div>
  )
}

export default Home
