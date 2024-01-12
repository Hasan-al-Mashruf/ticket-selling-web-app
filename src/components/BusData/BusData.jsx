import React, { useEffect, useState } from "react";

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import {
  getBusData,
  getBusFilterCategory,
  getReviewData,
} from "../../features/api";
import {
  convertTo24HourFormat,
  getReportingTimeFromInternationalStandard,
} from "../../utils/utils";
import BusDetails from "../BusDetails/BusDetails";
import { useDispatch } from "react-redux";
import { bookSits } from "../../features/bookingSlice";
import toast, { Toaster } from "react-hot-toast";
import { fetchBusData, fetchReviews } from "../../features/bookingThunk";
import RenderBusItem from "../RenderBusItem/RenderBusItem";

const BusData = ({
  setShowBusDts,
  showBusDts,
  busDetailsRef,
  setDisplayAll,
  displayAll,
  busData: busList,
}) => {
  const dispatch = useDispatch();
  const [convertedSTime, setConvertedSTime] = useState(null);
  const [convertedETime, setConvertedETime] = useState(null);
  const reviewList = getReviewData();
  const filteredCategory = getBusFilterCategory();

  const {
    startLocation,
    arriveLocation,
    selectedTimePeriod,
    selectedBusCategories,
  } = filteredCategory;

  useEffect(() => {
    if (selectedTimePeriod) {
      let [startTime, endTime] = selectedTimePeriod.split("-");

      let [sTime, meridiem] = startTime.split(/(\am|\pm)/i);
      let [eTime, endTimeMeridiem] = endTime.split(/(\am|\pm)/i);
      setConvertedSTime(convertTo24HourFormat(sTime, meridiem));
      setConvertedETime(convertTo24HourFormat(eTime, endTimeMeridiem));
    }
  }, [selectedTimePeriod, filteredCategory]);

  const filteredBusList = busList?.filter((bus) => {
    const [busCompany, busType] = bus?.name?.split("Express");

    const { departure_time } = bus;

    let [startTime, meridiem] = departure_time?.split(/(\am|\pm)/i);
    const convertedDepartureTime = convertTo24HourFormat(startTime, meridiem);

    let isSimilarCategory = true;
    if (selectedBusCategories?.length > 0) {
      isSimilarCategory = selectedBusCategories?.some((selectedType) =>
        busType.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    return (
      bus.boarding === startLocation &&
      bus.destination === arriveLocation &&
      convertedDepartureTime >= convertedSTime &&
      convertedDepartureTime <= convertedETime &&
      isSimilarCategory
    );
  });

  const showDetailsData = (id, bus) => {
    dispatch(bookSits([]));
    setShowBusDts(id);
  };
  const [updateCounter, setUpdateCounter] = useState(0);
  const [reviewCount, setReviewCount] = useState([]);

  useEffect(() => {
    // Fetch bus data or dispatch an action to fetch it
    dispatch(fetchReviews());
    dispatch(fetchBusData());
  }, [updateCounter, dispatch]);

  useEffect(() => {
    if (filteredBusList.length == 0 && convertedETime && convertedSTime) {
      if (!filteredCategory.isTrue) {
        toast.error(
          `${startLocation} to ${arriveLocation} is not available at ${selectedTimePeriod}`
        );
      }
      setConvertedETime(null);
    }
  }, [filteredBusList]);

  const showAllItems = () => {
    setDisplayAll(!displayAll);
  };

  return (
    <div className="container">
      <div>
        <div className="md:grid grid-cols-7 gap-8 hidden shadow h-[40px] items-center px-5 mb-4 border rounded-md">
          <div className="col-span-2">Name</div>
          <div>Boarding</div>
          <div>Destination</div>
          <div>Reporting</div>
          <div>Departure</div>
          <div>Fare</div>
        </div>
      </div>
      <div className="relative lg:p-0 p-5">
        <div>
          {filteredBusList?.length > 0
            ? filteredBusList?.map((bus, index) => (
                <RenderBusItem
                  key={bus._id}
                  bus={bus}
                  showDetailsData={showDetailsData}
                  showBusDts={showBusDts}
                  busDetailsRef={busDetailsRef}
                />
              ))
            : busList
                ?.slice(0, displayAll ? busList.length : 4)
                .map((bus) => (
                  <RenderBusItem
                    key={bus._id}
                    bus={bus}
                    showDetailsData={showDetailsData}
                    showBusDts={showBusDts}
                    busDetailsRef={busDetailsRef}
                  />
                ))}
        </div>

        {!filteredBusList.length > 0 && (
          <div
            onClick={showAllItems}
            className="w-14 h-14 rounded-full border flex items-center justify-center shadow-lg absolute -bottom-[30px] left-1/2 -translate-x-1/2 z-50 bg-[#fff] cursor-pointer"
          >
            {!displayAll ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default BusData;
