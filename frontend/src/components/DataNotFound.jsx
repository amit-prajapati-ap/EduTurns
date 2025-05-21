import React from "react";
import { assets } from "../assets/assets";

const DataNotFound = () => {
  return (
    <div className="flex my-8 justify-center flex-col">
      <img src={assets.dataNotFound} alt="" />
      <h2 className="text-4xl font-bold text-center">No Data Found</h2>
      <p className="text-center text-xl text-gray-500">
        We're sorry, no data available at the moment. Please check back later.
      </p>
    </div>
  );
};

export default DataNotFound;
