import React from "react";
import userimg from "../../assets/user.png";
import { getBookedSit, showCurrentUser } from "../../features/api";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdMailOutline, MdOutlinePhoneCallback } from "react-icons/md";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { bookSits, updateCurrentUser } from "../../features/bookingSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const user = showCurrentUser();
  const bookedSit = getBookedSit();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        localStorage.clear("userData");
        dispatch(updateCurrentUser({}));
        dispatch(bookSits([]));
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div
      className={ `${!user.name && "hidden"} bg-white z-50 relative`}
      style={{ backdropFilter: "blur(3px)" }}
    >
      <div className="container relative">
        <div className="py-2 border-b-orange-50 lg:px-0 px-4">
          <div className="flex justify-between">
            <div className="md:flex gap-3 items-center hidden">
              <li className="flex items-center gap-2 ">
                <MdOutlinePhoneCallback className="text-xl text-[#ff6a00]" />
                <span> 01842351008</span>
              </li>
              <li className="flex items-center gap-2 ">
                <MdMailOutline className="text-xl text-[#ff6a00]" />
                <span>mashrif125@gmail.com</span>
              </li>
            </div>
            <div className="flex items-center gap-10 justify-end flex-1">
              <div className="lg:flex gap-2 items-center hidden">
                <FaFacebookF className="text-xl text-[#ff6a00]" />
                <FaXTwitter className="text-xl text-[#ff6a00]" />
                <FaInstagram className="text-xl text-[#ff6a00]" />
              </div>

              <div>
                {bookedSit?.length > 0 && (
                  <button className="mr-3">
                    <Link to="/checkout">Checkout</Link>
                  </button>
                )}
                {user.name && <button onClick={logout}>Log out</button>}
              </div>
              {user?.name && (
                <div className="flex gap-2 items-center">
                  <span>{user?.name}</span>
                  <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                    <img src={userimg} alt="" className="w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
