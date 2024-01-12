import React from "react";
import { MdMailOutline, MdOutlinePhoneCallback } from "react-icons/md";
const Footer = () => {
  return (
    <div
      className=" bg-white  z-50 relative border-t mt-14"
      style={{ backdropFilter: "blur(3px)" }}
    >
      <div className="container relative">
        <div className="py-2 border-b-orange-50">
          <span className=" block text-center">
            © {new Date().getFullYear()} Moeenuddin Ahmad. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
