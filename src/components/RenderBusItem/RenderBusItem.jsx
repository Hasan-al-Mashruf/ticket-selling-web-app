import React from "react";
import {
  convertTo24HourFormat,
  getReportingTimeFromInternationalStandard,
} from "../../utils/utils";
import BusDetails from "../BusDetails/BusDetails";

const RenderBusItem = ({
  bus,
  index,
  showBusDts,
  showDetailsData,
  busDetailsRef,
}) => {
  const { name, boarding, destination, departure_time, fare, _id: id } = bus;

  let [startTime, meridiem] = departure_time?.split(/(\am|\pm)/i);
  const convertedDepartureTime = convertTo24HourFormat(startTime, meridiem);

  const reportingTime = getReportingTimeFromInternationalStandard(
    convertedDepartureTime
  );
  const [busCompany, busType] = name.split("Express");

  return (
    <React.Fragment key={id}>
      <div
        className="grid md:grid-cols-7 gap-8 shadow md:h-[90px] md:py-0 py-10  items-center px-5 md:mb-4 mb-8 border rounded-md"
        onClick={() => showDetailsData(id, bus)}
      >
        <div className="col-span-2">
          {busCompany} Express{" "}
          <span className="bg-orange-400 inline-block py-1 px-3 text-white -skew-x-6 ml-2">
            {busType}
          </span>
        </div>
        <div>{boarding}</div>
        <div>{destination}</div>
        <div>{reportingTime && reportingTime}</div>
        <div>{departure_time}</div>
        <div>{fare}.00</div>
      </div>
      {showBusDts === id && (
        <BusDetails bus={bus} busDetailsRef={busDetailsRef} id={id} />
      )}
    </React.Fragment>
  );
};

export default RenderBusItem;
