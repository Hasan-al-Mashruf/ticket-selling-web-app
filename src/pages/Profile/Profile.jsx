import React, { useEffect, useState } from "react";
import { showCurrentUser } from "../../features/api";
import Header from "../../components/Header/Header";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import "./Profile.css";
import Modal from "../../components/Modal/Modal";
const Profile = () => {
  const user = showCurrentUser();
  const [bookings, setBookings] = useState([]);
  const [hoverdIndex, setHoverdIndex] = useState(null);
  const [isShoeModal, setIsShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [isReview, setIsReview] = useState([]);

  useEffect(() => {
    const fetchBusDetails = async () => {
      const data = await fetch(
        `https://ticket-selling-web-app-server-side.vercel.app/singlebookings?id=${user?.userid}`
      );
      const response = await data.json();
      setBookings(response);
    };
    fetchBusDetails();
  }, [user]);

  // Filter bookings for today
  const todayBookings = bookings.filter((booking) => {
    return (
      new Date(booking.selectedDate).toDateString() ===
      new Date().toDateString()
    );
  });

  // Filter bookings for other days
  const otherDayBookings = bookings.filter(
    (booking) =>
      new Date(booking.selectedDate).toDateString() !==
      new Date().toDateString()
  );

  const showModal = (booking) => {
    setBookingData(booking);
    setIsShowModal(true);
  };

  useEffect(() => {
    const storedIsReview = JSON.parse(localStorage.getItem("isReview")) || [];
    setIsReview(storedIsReview);
  }, [isShoeModal]);

  return (
    <div className="relative">
      <Header />
      <BreadCrumb />
      <div className="container">
        <div className="mt-10 px-4">
          <span className="block text-2xl  font-normal">New Bookings</span>
          <span className="w-[100px] h-[12px] bg-[#FB923C] block mb-8 mt-2 "></span>
          {todayBookings
            ?.slice()
            .reverse()
            .map((booking, index) => (
              <div
                className="mb-10 border rounded-md  overflow-scroll md:overflow-hidden "
                key={index}
              >
                <table className="mid:min-w-fit min-w-[800px]">
                  <tbody>
                    {booking.bookingDetails.map((details, innerIndex) => (
                      <tr key={innerIndex}>
                        <td className="p-5">
                          {details.name}{" "}
                          {details.quantity
                            ? details.quantity + "x"
                            : undefined}
                        </td>
                        <td className="p-5">{details.sitName}</td>
                        <td className="p-5">{details.boarding}</td>
                        <td className="p-5">{details.destination}</td>
                        <td className="p-5">
                          {details.fare ? details.fare : details.price} Tk
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>

        <div className="mt-10 otherdayBookings px-4">
          <span className="block text-2xl  font-normal">Previous Bookings</span>
          <span className="w-[100px] h-[12px] bg-[#FB923C] block mb-8 mt-2 "></span>
          <div className="relative">
            {otherDayBookings
              ?.slice()
              .reverse()
              .map((booking, index) => {
                const isDisabled = isReview?.some(
                  (bus) =>
                    bus.toLowerCase() ==
                    booking.bookingDetails[0].name.toLowerCase()
                );
                return (
                  <div
                    className="mb-10 border rounded-md relative otherdayBookings overflow-scroll md:overflow-hidden"
                    key={index}
                    onMouseEnter={() => setHoverdIndex(index)}
                    onMouseLeave={() => setHoverdIndex(null)}
                  >
                    <table
                      className={`${
                        index == hoverdIndex ? "blur-sm" : ""
                      } mid:min-w-fit min-w-[800px]`}
                    >
                      <tbody>
                        {booking.bookingDetails.map((details, innerIndex) => (
                          <tr key={innerIndex}>
                            <td className="p-5">
                              {details.name}{" "}
                              {details.quantity
                                ? details.quantity + "x"
                                : undefined}
                            </td>
                            <td className="p-5">{details.sitName}</td>
                            <td className="p-5">{details.boarding}</td>
                            <td className="p-5">{details.destination}</td>
                            <td className="p-5">
                              {details.fare ? details.fare : details.price} Tk
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button
                      disabled={isDisabled}
                      onClick={() => showModal(booking)}
                      className={`${
                        index == hoverdIndex ? "visible" : "hidden"
                      } ${
                        isDisabled
                          ? "opacity-70 bg-[#a3a3a3] pointer-events-none"
                          : ""
                      } absolute capitalize top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[38px] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
                    >
                      {isReview?.some(
                        (bus) =>
                          bus.toLowerCase() ==
                          booking.bookingDetails[0].name.toLowerCase()
                      )}
                      {isDisabled
                        ? "Thanks For the Review"
                        : " Give us a review"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {isShoeModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          bookingData={bookingData}
          isShoeModal={isShoeModal}
          setIsReview={setIsReview}
          isReview={isReview}
        />
      )}
    </div>
  );
};

export default Profile;
