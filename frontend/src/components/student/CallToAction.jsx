import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Incididunt sint fugiat pariatur cupidatat consectetur sitcillum anim id veniam aliqua proident excepteur commodo doea.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <Link to={'/course-list'} className='px-10 cursor-pointer py-3 rounded-md text-white bg-blue-600 hover:bg-blue-600/90 transition-all duration-200'>Get started</Link>
        <button className='flex cursor-pointer hover:text-blue-600 hover:underline items-center gap-2'>Learn more <img src={assets.arrow_icon} /></button>
      </div>
    </div>
  )
}

export default CallToAction
