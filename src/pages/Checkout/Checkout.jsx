import React, { useEffect, useState } from "react";

import {
  getBookedCouch,
  getBookedSit,
  getTotalItem,
  showCurrentUser,
} from "../../features/api";
import { FaLongArrowAltRight } from "react-icons/fa";
import Header from "../../components/Header/Header";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./Checkout.css";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Signup from "../../components/FormValidation/Signup";
import Signin from "../../components/Signin/Signin";
const Checkout = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const user = showCurrentUser();
  const foodItem = getTotalItem();
  const bookedSit = getBookedSit();
  const couch = getBookedCouch();

  const foodCost = foodItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const getFormattedDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const [data, setData] = useState({
    bookingDetails: [...bookedSit, ...foodItem],
    selectedDate: getFormattedDate(new Date()),
  });

  useEffect(() => {
    setData({
      ...data,
      guestName: user?.name,
      guestemail: user?.email,
      guestid: user?.userid,
    });
  }, [user]);

  const confirmbooking = async () => {
    if (data?.guestName && data?.guestid) {
      try {
        const response = await fetch("http://localhost:5000/booked", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.insertedId) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  if (bookedSit.length == 0) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  const [isSignInVisible, setIsSignInVisible] = useState(true);

  const toggleSignInVisibility = () => {
    setIsSignInVisible(!isSignInVisible);
  };
  return (
    <div>
      <Header />
      <BreadCrumb />
      <div className="checkout lg:h-[60vh] md:h-[40vh] items-center flex ">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center md:py-0 py-6">
            <div className="">
              {user?.name ? (
                <div className="grid grid-cols-4 gap-3 p-10 rounded-sm border lg:w-1/2 mx-auto">
                  {couch &&
                    couch?.length > 0 &&
                    couch?.map((sit, index) => {
                      const { sit: sitNumber } = sit;
                      return (
                        <React.Fragment key={index}>
                          <button
                            className={`${
                              sit?.isBooked ? "opacity-50" : ""
                            }  rounded-md h-8 text-xs uppercase text-black font-medium bg-[#ffdaa0] w-[40px]`}
                            disabled={true}
                          >
                            {sitNumber}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>
              ) : (
                <div>
                  <div className="mb-16">
                    <div className="lg:w-[400px] border rounded p-1 mx-auto">
                      <button
                        className={`w-1/2 btn h-[38px] py-2 px-4  rounded ${
                          isSignInVisible ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={toggleSignInVisibility}
                      >
                        Sign up
                      </button>
                      <button
                        className={`w-1/2 btn h-[38px] py-2 px-4  rounded ${
                          isSignInVisible ? "" : "bg-blue-500 text-white"
                        }`}
                        onClick={toggleSignInVisibility}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                  {isSignInVisible ? <Signup /> : <Signin />}
                </div>
              )}
            </div>

            <div>
              <div className="flex gap-3 flex-col">
                <h4 className="text-base ">
                  Bus Name :{" "}
                  <span className="text-[#FB923C]">{bookedSit[0]?.name}</span>
                </h4>
                <h4 className="text-base ">
                  Total Sits : {bookedSit.length.toString().padStart(2, "0")}
                </h4>
                <h4 className="text-base ">
                  Sit Number :
                  {bookedSit.map((sit, index) => (
                    <button
                      key={index}
                      className={`
              rounded-md h-8 text-xs uppercase  bg-[#ffdaa0] w-[40px] text-black mx-2 font-semibold`}
                      disabled={true}
                    >
                      {sit?.sitName}
                    </button>
                  ))}
                </h4>
                {foodItem.map((item, index) => {
                  return (
                    <h4 className="text-base  capitalize" key={index}>
                      {item?.name} :{" "}
                      {item?.quantity.toString().padStart(2, "0")}
                    </h4>
                  );
                })}
                <hr />
                <div className="flex justify-between items-center flex-wrap md:gap-4 lg:gap-0 gap-x-10 gap-y-2">
                  <h4>
                    Bus Fare + Food cost = ({bookedSit[0]?.fare} x{" "}
                    {bookedSit?.length}) + {""}
                    {foodCost}
                  </h4>
                  <div>
                    <FaLongArrowAltRight />
                  </div>
                  <h4>
                    {" "}
                    <strong>
                      {bookedSit[0]?.fare * bookedSit?.length + foodCost}
                    </strong>{" "}
                    Taka
                  </h4>
                </div>
              </div>

              <button
                disabled={user?.name ? false : true}
                className={`${
                  user?.name ? "opacity-100" : "opacity-50"
                } btn mt-12 h-[38px] flex  items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
                onClick={confirmbooking}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
