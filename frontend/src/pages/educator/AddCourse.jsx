import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import {toast, ToastContainer} from 'react-toastify'

const AddCourse = () => {
  const quillRef = useRef(null)
  const editorRef = useRef(null)
  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPriviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:')
      toast.success("Chapter Created", {draggable: true})
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        }
        setChapters([...chapters, newChapter])
      }
    }
    else if (action === 'remove') {
      setChapters(chapters.filter(chapter => chapter.chapterId !== chapterId))
      toast.success("Chapter Removed", {draggable: true})
    }
    else if (action === 'toggle') {
      setChapters(
        chapters.map(chapter => chapter.chapterId === chapterId ? {
          ...chapter, collapsed: !chapter.collapsed
        } : chapter)
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPopup(true);
    }
    else if (action === 'remove') {
      setChapters(
        chapters.map(chapter => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1)
          }
          return chapter
        })
      )
      toast.success("Lecture Removed", {draggable: true})
    }
  }

  const addLecture = () => {
    setChapters(
      chapters.map(chapter => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId: uniqid()
          }
          chapter.chapterContent.push(newLecture)
        }
        return chapter
      })
      
    );

    setShowPopup(false)
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPriviewFree: false,
    });
    toast.success("Lecture Added", {draggable: true})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    toast.success("Course Added", {draggable: true})
  }

  useEffect(() => {
    //Initialising Quill at once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className='min-h-[90vh] overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3 cursor-pointer'>
              <img src={assets.file_upload_icon} className='p-3 bg-blue-500 rounded' />
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
              <img className='max-h-10' src={image ? URL.createObjectURL(image) : ''} />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
            <p>Discount %</p>
            <input onChange={e => setDiscount(e.target.value)} value={discount} type="number" min={0} max={100} placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
        </div>

        {/* Adding Chapters & Lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img  onClick={() => handleChapter('toggle', chapter.chapterId)} src={assets.dropdown_icon} width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`} />
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img  onClick={() => handleChapter('remove', chapter.chapterId)} src={assets.cross_icon} className='cursor-pointer' />
              </div>
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'>Link</a> - {lecture.isPriviewFree ? 'Free Priview' : 'Paid'}</span>
                      <img  onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)} src={assets.cross_icon} className='cursor-pointer' />
                    </div>
                  ))}

                  <div onClick={() => handleLecture('add', chapter.chapterId)} className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>+ Add Lecture</div>
                </div>
              )}
            </div>
          ))}

          <div onClick={() => handleChapter('add')} className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'>+ Add Chapter</div>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800/70'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                <div>
                  <p>Lecture Title</p>
                  <input type="text" className='mt-1 block w-full border rounded py-1 px-2' value={lectureDetails.lectureTitle} onChange={e => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})} />
                </div>
                <div>
                  <p>Duration (minutes)</p>
                  <input type="number" className='mt-1 block w-full border rounded py-1 px-2' value={lectureDetails.lectureDuration} onChange={e => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})} />
                </div>
                <div>
                  <p>Lecture URL</p>
                  <input type="text" className='mt-1 block w-full border rounded py-1 px-2' value={lectureDetails.lectureUrl} onChange={e => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})} />
                </div>
                <div className='flex flex-row-reverse justify-end gap-1 my-2 items-center pl-1'>
                  <label htmlFor='isPreview' className='mt-0.5'>Is Preview Free?</label>
                  <input type="checkbox" id='isPreview' className='mt-1 block scale-125' checked={lectureDetails.isPriviewFree} onChange={e => setLectureDetails({...lectureDetails, isPriviewFree: e.target.checked})} />
                </div>

                <button onClick={addLecture} type='button' className='w-full bg-blue-400 cursor-pointer hover:bg-blue-500 transition-all duration-200 text-white px-4 py-2 rounded'>Add</button>

                <img onClick={() => setShowPopup(false)} src={assets.cross_icon} className='absolute top-4 right-4 w-4 cursor-pointer'/>
              </div>
            </div>
          )}
        </div>

        <button type='submit' className='bg-green-600 font-semibold text-lg cursor-pointer text-white w-max py-2.5 px-8 rounded my-4 transition-all duration-200 hover:bg-green-600/90'>ADD</button>
      </form>
      <ToastContainer className='hidden'/>
    </div>
  )
}

export default AddCourse
