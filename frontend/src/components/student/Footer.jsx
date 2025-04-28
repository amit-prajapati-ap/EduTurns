import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10 text-white/80">
      <div className="flex flex-col md:flex-row md:px-0 items-start px-8 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <Link to={"/"} className="flex items-center gap-1.5 cursor-pointer">
            <img src={assets.logo} className="w-7 pb-1" />
            <p className="font-bold text-xl text-white">EduTurns</p>
          </Link>
          <p className="mt-6 text-center md:text-left text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum,
            magni esse deleniti accusamus laboriosam dolorum fugit rem totam
            veniam sunt dolores quisquam.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold mb-5 text-white">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm md:space-y-2">
            <li><a href="#" className="hover:text-blue-500 transition-all duration-200">Home</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-all duration-200">About us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-all duration-200">Contact us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-all duration-200">Privacy policy</a></li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm">The latest news, articles, and resources, sent to your inbox weekly.</p>
          <form className="flex items-center gap-2 pt-4">
            <input className="border border-gray-500/30 bg-gray-800 text-gray-400 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm" type="email" placeholder="Enter your email" />
            <button className="bg-blue-600 hover:bg-blue-600/90 transition-all duration-200 cursor-pointer w-2/4 h-9 text-white rounded">Subscribe</button>
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
