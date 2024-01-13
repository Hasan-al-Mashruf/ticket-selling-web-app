import React, { useEffect, useState } from "react";
import { FaBity } from "react-icons/fa6";
import video from "../../assets/10 Most Luxurious Buses in the World.mp4";
import { getBusData } from "../../features/api";

import BusCard from "../BusCard/BusCard";

const Hero = ({
  setShowBusDts,
  showBusDts,
  busDetailsRef,
  setDisplayAll,
  busData,
}) => {
  const [busTicketData, setBusTicketData] = useState({});
  const [busCategory, setBusCategory] = useState("");
  const [busExtraInfo, setBusExtrainfo] = useState({});
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (!busTicketData?.name) {
      const findARandomNumber = Math.floor(Math.random() * busData?.length);
      setBusTicketData(busData[findARandomNumber]);
    }

    if (busTicketData?.name) {
      const category = busTicketData?.name?.split("Shuttle Express");
      if (category?.length > 0) {
        const trimmedCategory = category[1]?.trim();
        setBusCategory(trimmedCategory);
      }
    }
  }, [busData, busTicketData]);

  useEffect(() => {
    const fetchBusDetails = async () => {
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

  useEffect(() => {
    if (showBusDts && busDetailsRef.current) {
      busDetailsRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [trigger]);

  const showBusDetails = (newId) => {
    let id = newId || busTicketData?._id;
    setDisplayAll(true);
    setShowBusDts(id);
    setTrigger(!trigger);
  };

  return (
    <div className="relative">
      <div className="relative lg:h-[80vh] h-full mb-8 px-4 py-10">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 right-0 w-full lg:h-[80vh] h-full object-cover object-center -z-10"
        ></video>
        <div className="absolute top-0 left-0 right-0 w-full lg:h-[80vh] h-full z-0 bg-[#000000af]"></div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-0 gap-8 relative z-40 container lg:h-full items-center">
          <div className="h-full flex flex-col justify-center items-start gap-6">
            <div>
              <span className="text-white mb-2 font-thin">{busCategory}</span>
              <h2 className="text-6xl text-white font-semibold">
                Shuttle Express
              </h2>
            </div>
            <p className="text-white">{busExtraInfo?.description}</p>
            <ul className="flex flex-col gap-4 text-white">
              <li className="flex items-center gap-2">
                <FaBity className="fill-[#FB923C] text-[24px]" />
                <h4>
                  Boarding: <strong> {busTicketData?.boarding}</strong>
                </h4>
              </li>
              <li className="flex items-center gap-2">
                <FaBity className="fill-[#FB923C] text-[24px]" />
                <h4>
                  Destination: <strong> {busTicketData?.destination}</strong>
                </h4>
              </li>
              <li className="flex items-center gap-2">
                <FaBity className="fill-[#FB923C] text-[24px]" />
                <h4>
                  Departure: <strong>{busTicketData?.departure_time}</strong>
                </h4>
              </li>
            </ul>
            <button
              onClick={() => showBusDetails()}
              className="h-[38px] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              Book Now
            </button>
          </div>
          <div>
            <img
              src={busExtraInfo?.image}
              alt=""
              className="mx-auto lg:ml-auto"
              style={{
                filter: "drop-shadow(26px 52px 46px rgba(156, 156, 156, 0.7))",
              }}
            />
          </div>
        </div>
      </div>
      <BusCard busData={busData} showBusDetails={showBusDetails} />
    </div>
  );
};

export default Hero;
