import React from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const isEducator = useSelector(
    (state) => state.appContext.appData.isEducator
  );
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <Link to={"/"} className="flex items-center gap-1.5 cursor-pointer mr-3">
        <img src={assets.logo} className="w-7 pb-1" />
        <p className="font-bold text-xl">EduTurns</p>
      </Link>

      {/* PC View */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              |<Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center min-[380px]:gap-2 sm:gap-3 max-sm:text-xs">
          {user && (
            <>
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer text-center"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>{" "}
              <p className="h-6 w-0.5 bg-gray-500/80 hidden min-[450px]:block"></p>
              <Link to="/my-enrollments" className="text-center">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className="cursor-pointer">
            <img src={assets.user_icon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
