import React from "react";
import Navbar from "./student/Navbar";
import Footer from "./student/Footer";
import { useMatch } from "react-router-dom";

const Layout = (props) => {
  const isEducatorRoute = useMatch('/educator/*')

  return (
    <div>
      {!isEducatorRoute && <Navbar />}
      {props.children}
      {!isEducatorRoute && <Footer />}
    </div>
  );
};

export default Layout;
