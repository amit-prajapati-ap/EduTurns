import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState('')
  const handleSubscribe = (e) => {
    e.preventDefault()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      toast.error("Email is Required")
    } else if(emailRegex.test(email)) {
      toast.success("Thanks For Subscribing Us")
      setEmail('')
    } else {
      toast.warn("Incorrect Email")
    }
  }

  return (
    <footer className="bg-gray-900 md:px-6 lg:px-36 text-left w-full mt-10 text-white/80">
      <div className="flex flex-col lg:flex-row md:px-0 items-start px-8 justify-center gap-10 xl:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col lg:items-start items-center w-full">
          <Link to={"/"} className="flex items-center gap-1.5 cursor-pointer">
            <img src={assets.logo} className="w-7 pb-1" />
            <p className="font-bold text-xl text-white">EduTurns</p>
          </Link>
          <p className="mt-6 text-center lg:text-left text-sm">
            EduTurns is a modern, full-stack education platform, designed to simplify and enhance digital learning. It features secure authentication, seamless payment integration, and an intuitive UI for both students and educators.
          </p>
        </div>
        <div className="flex gap-6 w-full">        
          <div className="flex flex-col lg:items-start w-full">
            <h2 className="font-semibold mb-5 text-white">Navigate</h2>
            <ul className="flex lg:flex-col w-full gap-4 flex-wrap text-sm md:space-y-2">
              <li><Link to="/" className="hover:text-blue-500 transition-all duration-200">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-all duration-200">About us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-all duration-200">Contact us</Link></li>
            </ul>
          </div>
          <div className="flex flex-col lg:items-start w-full">
            <h2 className="font-semibold mb-5 text-white">Socials</h2>
            <ul className="flex lg:flex-col w-full gap-4 flex-wrap text-sm md:space-y-2">
              <li><a href="https://portfolio-amit-prajapati.vercel.app" target="_blank"
              rel="noopener noreferrer" className="hover:text-blue-500 cursor-pointer transition-all duration-200">Portfolio</a></li>
              <li><a href="https://github.com/amit-prajapati-ap" target="_blank"
              rel="noopener noreferrer" className="hover:text-blue-500 cursor-pointer transition-all duration-200">Github</a></li>
              <li><a href="https://www.linkedin.com/in/amit-prajapati-0544882b5" target="_blank"
              rel="noopener noreferrer" className="hover:text-blue-500 cursor-pointer transition-all duration-200">Linkedin</a></li>
              <li><a href="https://x.com/Prajapatiamitap" target="_blank"
              rel="noopener noreferrer" className="hover:text-blue-500 cursor-pointer transition-all duration-200">Twitter(X)</a></li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form className="flex items-center gap-2 pt-4">
            <input className="border border-gray-500/30 bg-gray-800 text-gray-400 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <button onClick={handleSubscribe} className="bg-blue-600 hover:bg-blue-600/90 transition-all duration-200 cursor-pointer w-2/4 h-9 text-white rounded">Subscribe</button>
          </form>
        </div>
      </div>
      <p className="py-4 text-center text-xs text-white/60 md:text-sm">
        &copy; Copyright {new Date().getFullYear()} EduTurns. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
