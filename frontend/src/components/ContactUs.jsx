import React, { useRef, useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailjs from '@emailjs/browser'

const ContactUs = () => {
  const form = useRef()
  const [isSend, setIsSend] = useState(false)

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSend(true)
    emailjs.sendForm(
      "service_9113gor",
      "template_auoz3cr",
      form.current,
      "QbDwqsQLua2Ta_sqs"
    )
    .then(() => {
      setIsSend(false)
      form.current.reset()
      toast.success("Message Sent Successfully",{
        autoClose: 3000,
        theme: "dark"
      })
    })
    .catch(() => {
      setIsSend(false)
      toast.error("Failed to Send Message. Please Try Again",{
        autoClose: 3000,
        theme: "dark"
      })
    })
  }

  return (
    <section
      id="contact"
      className="px-[7vw] py-8 sm:py-24 sm:pb-24 max-w-[1900px] mx-auto font-sans relative text-white"
    >
      <ToastContainer/>
      {/* Section Title  */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-600">CONTACT</h2>
        <div className="w-24 h-1 mx-auto mt-2 bg-[#8245ec]"></div>
        <p className="text-gray-800 mt-4 text-lg font-semibold">
          I'd love to hear from you, reach out for any opportunities or questions!
        </p>
      </div>

      <div className='mx-auto max-w-[1024px] flex justify-between gap-4 flex-col md:flex-row bg-slate-950 rounded-2xl p-4 xs:p-8 shadow-[0_0_40px_5px_rgba(130,69,236,0.9)] backdrop-blur-md'>
        {/* Contact Header  */}
        <div className='flex flex-col justify-between gap-4 text-purple-600 w-full'>
          <div className='flex flex-col gap-1'>
            <h2 className='text-2xl font-semibold'>CONTACT WITH ME 🚀</h2>
            <div className='h-1 w-16 bg-purple-600'></div>
          </div>
          <p className='font-[500]'>Email Us On: apamit6239@gmail.com</p>
        </div>

        {/* Contact Body  */}
        <form ref={form} onSubmit={sendEmail} className='w-full flex flex-col gap-4'>
          <input type="email" name="user_email" placeholder='EMAIL*' required className='w-full p-3 rounded-md bg-[#131025] text-white focus:outline-none border border-gray-600 focus:border-purple-600' />
          <input type="text" name="user_name" placeholder='NAME*' required className='w-full p-3 rounded-md bg-[#131025] text-white focus:outline-none border border-gray-600 focus:border-purple-600' />
          <input type="text" name="title" placeholder='SUBJECT*' required className='w-full p-3 rounded-md bg-[#131025] text-white focus:outline-none border border-gray-600 focus:border-purple-600' />
          <textarea type="message" name='message' placeholder='MESSAGE' rows="4" className='w-full p-3 rounded-md bg-[#131025] text-white focus:outline-none border border-gray-600 focus:border-purple-600' />

          {/* Send Button  */}
          <button type='submit' disabled={isSend} className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 py-2 text-white font-semibold rounded-md hover:opacity-90 transition duration-300 text-xl ${isSend ? "cursor-not-allowed" : ""}`}>{isSend ? "Sending..." : "Send"}</button>
        </form>
      </div>
    </section>
  )
}

export default ContactUs

