import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AiFillLinkedin, AiOutlineTwitter, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  const date = new Date()

  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <Link to={"/"} className="flex items-center gap-1.5 cursor-pointer">
          <img src={assets.logo} className="w-7 pb-1" />
          <p className="font-bold text-xl">EduTurns</p>
        </Link>
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright {date.getFullYear()} &copy; EduTurns. All Right Reserved.
        </p>
      </div>

      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/amit-prajapati-0544882b5/">
          <AiFillLinkedin size={35} className="cursor-pointer"/>
        </a>
        <a href="https://x.com/Prajapatiamitap">
          <AiOutlineTwitter size={35} className="cursor-pointer"/>
        </a>
        <a href="https://github.com/amit-prajapati-ap">
          <AiFillGithub size={35} className="cursor-pointer"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
