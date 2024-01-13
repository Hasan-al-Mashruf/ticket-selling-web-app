import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bookSits, updatedBookedCouch } from "../../features/bookingSlice";
import BookedSits from "../BookedSits/BookedSits";
import MealBox from "../MealBox/MealBox";
import { Link, useNavigate } from "react-router-dom";
import {
  getBookedSit,
  getBookingData,
  showCurrentUser,
} from "../../features/api";
import { couchNumber } from "../../utils/utils";

const BusDetails = ({ bus, busDetailsRef }) => {
  const bookingData = getBookingData();
  const [busCategory, setBusCategory] = useState("");
  const [busExtraInfo, setBusExtrainfo] = useState({});
  const dispatch = useDispatch();
  const isBookedSit = getBookedSit();
  const [couch, setCouch] = useState(couchNumber);
  const navigate = useNavigate();

  const flattenedBookingData = bookingData.flatMap(
    (booking) => booking.bookingDetails
  );

  const [reset, setReset] = useState(true);
  useEffect(() => {
    const updatedCouch = couch.map((sit) => ({
      ...sit,
      isBooked: flattenedBookingData.some(
        (booking) =>
          booking.boarding == bus.boarding &&
          booking.destination == bus.destination &&
          booking.sitName === sit.sit
      ),
    }));
    setCouch(updatedCouch);
  }, [reset]);

  const bookAaSit = (sitNumber) => {
    const updatedCouch = couch.map((item) =>
      item.sit === sitNumber ? { ...item, isBooked: true } : item
    );

    setCouch(updatedCouch);

    const bookingDetails = {
      name: bus.name,
      sitName: sitNumber,
      boarding: bus.boarding,
      destination: bus.destination,
      fare: bus.fare,
    };
    dispatch(bookSits(bookingDetails));
  };

  const resetAll = () => {
    dispatch(bookSits([]));
    setReset(!reset);
  };

  useEffect(() => {
    if (couch) {
      dispatch(updatedBookedCouch(couch));
    }
  }, [couch]);

  const openCheckoutPages = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchBusDetails = async () => {
      const category = bus?.name?.split("Shuttle Express");
      if (category?.length > 0) {
        const trimmedCategory = category[1]?.trim();

        setBusCategory(trimmedCategory);
      }
      if (busCategory) {
        const data = await fetch(
          `https://ticket-selling-web-app-server-side.vercel.app/availableBus?category=${busCategory}`
        );
        const response = await data.json();

        setBusExtrainfo(response);
      }
    };
    fetchBusDetails();
  }, [busCategory]);

  return (
    <div className="mb-5  p-0 md:p-10">
      <div className="grid lg:grid-cols-7 md:grid-cols-2 grdi-cols-1 gap-12">
        <div className="lg:col-span-2">
          <div
            className="grid grid-cols-4 gap-3 p-10 rounded-sm border"
            ref={busDetailsRef}
          >
            {couch &&
              couch.length > 0 &&
              couch?.map((sit, index) => {
                const { sit: sitNumber } = sit;
                return (
                  <React.Fragment key={index}>
                    <button
                      className={`${
                        sit?.isBooked || isBookedSit.length >= 5
                          ? "opacity-50"
                          : ""
                      }  rounded-md h-8 text-xs uppercase text-black font-medium bg-[#ffdaa0] w-[40px]`}
                      disabled={
                        sit?.isBooked || isBookedSit.length >= 5 ? true : false
                      }
                      onClick={() => bookAaSit(sitNumber)}
                    >
                      {sitNumber}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
        <div className="md:col-span-2 ">
          <MealBox />
        </div>
        <div className="md:col-span-3">
          <BookedSits
            setCouch={setCouch}
            couch={couch}
            busImg={busExtraInfo.image}
          />
        </div>
      </div>
      <div className="flex justify-end mt-2 gap-2">
        <button
          onClick={() => resetAll()}
          disabled={isBookedSit.length > 0 ? false : true}
          className={`${
            isBookedSit.length > 0 ? "" : "opacity-50"
          } h-[38px] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
        >
          Reset All
        </button>

        <button
          onClick={openCheckoutPages}
          disabled={isBookedSit.length > 0 ? false : true}
          className={`${
            isBookedSit.length > 0 ? "" : "opacity-50"
          } h-[38px] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BusDetails;
