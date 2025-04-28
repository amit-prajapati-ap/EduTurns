import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { menuItems, isEducator } = useSelector(
    (state) => state.appContext.appData
  );

  return (
    isEducator && (
      <div className="md:w-64 w-1/6 border-r min-h-[92vh] text-base border-gray-500 py-2 flex flex-col">
        {menuItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${
                isActive
                  ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                  : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"
              }`
            }
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
          >
            <img src={item.icon} className="w-6 h-6" />
            <p className="md:block hidden text-center">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
