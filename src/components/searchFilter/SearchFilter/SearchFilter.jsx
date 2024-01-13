import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  coachTypeOptions,
  isDateInCurrentMonth,
  locations,
  timePeriodOptions,
} from "../../../utils/utils";

import "./SearchFilter.css";
import { useDispatch } from "react-redux";
import { addFilterCategory } from "../../../features/bookingSlice";
import { getBusFilterCategory, showCurrentUser } from "../../../features/api";
const SearchFilter = () => {
  const dispatch = useDispatch();
  const user = showCurrentUser();
  const [busCategorySelection, setBusCategorySelection] = useState([]);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const filteredCategory = getBusFilterCategory();
  const [formData, setFormData] = useState({
    startLocation: locations[0].value,
    arriveLocation: locations[2].value,
    selectedTimePeriod: timePeriodOptions[0].value,
    selectedDate: new Date(),
    selectedBusCategories: [],
  });

  const handleFieldChange = (fieldName, selectedOption) => {
    setFormData((prevFormData) => {
      if (fieldName === "selectedDate") {
        return {
          ...prevFormData,
          [fieldName]: selectedOption,
        };
      } else {
        return {
          ...prevFormData,
          [fieldName]: selectedOption ? selectedOption.value : null,
        };
      }
    });
  };

  const filterData = () => {
    if (!formData.selectedDate) {
      console.error("Selected date is null or undefined.");
      return;
    }

    const formattedDate = formData.selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    dispatch(addFilterCategory({ ...formData, selectedDate: formattedDate }));
  };

  const handleCheckboxChange = (category) => {
    setBusCategorySelection((prevSelection) => {
      if (prevSelection.includes(category)) {
        return prevSelection.filter((item) => item !== category);
      } else {
        return [...prevSelection, category];
      }
    });
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedBusCategories: busCategorySelection,
    }));
    if (busCategorySelection.length == 0) {
      setIsAllCheck(false);
    }
    if (busCategorySelection.length == 5) {
      setIsAllCheck(true);
    }
  }, [busCategorySelection]);

  const busCategory = ["Elite", "Scania", "Deluxe", "DoubleDecker", "Premium"];

  useEffect(() => {
    isAllCheck
      ? setBusCategorySelection(busCategory)
      : setBusCategorySelection([]);
  }, [isAllCheck]);

  const clearFilter = () => {
    dispatch(addFilterCategory({ isTrue: true }));
  };

  return (
    <div className="container lg:p-0 p-5">
      <div className="flex justify-between md:items-center  items-start md:h-11">
        <div className="gap-6 flex flex-wrap">
          {busCategory?.map((cat, index) => (
            <div key={index}>
              <input
                id={`checkbox-${index}`}
                name={`checkbox-${index}`}
                type="checkbox"
                value={cat}
                checked={busCategorySelection.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              <label htmlFor={`checkbox-${index}`} className="ml-2">
                {cat}{" "}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-3 min-w-[100px] justify-end">
          <button onClick={() => setIsAllCheck(!isAllCheck)}>
            {isAllCheck ? "Uncheck All" : "Check All"}
          </button>
          {filteredCategory?.startLocation &&
            filteredCategory?.arriveLocation && (
              <button onClick={clearFilter}>Clear Filter</button>
            )}
        </div>
      </div>
      <div className="grid md:grid-cols-9 gap-5 md:h-20 md:mt-0 mt-6 md:py-0 py-10 border items-center bg-orange-300 px-5 rounded-md">
        <div className="custom-datepicker relative col-span-2">
          <DatePicker
            selected={formData.selectedDate}
            onChange={(date) => handleFieldChange("selectedDate", date)}
            filterDate={isDateInCurrentMonth}
            placeholderText="Select a date in this month"
            dateFormat="MMMM d, yyyy"
          />

          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 flex justify-center items-center">
            <div className="custom-divider absolute -left-[2px]"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              id="calendar"
              className="w-5 h-5"
            >
              <g fill="#134563">
                <path d="M49.6 54H14.4C12 54 10 52 10 49.6V17.3c0-2.4 1.6-4.4 3.7-4.4h2.2v2.9h-2.2c-.3 0-.7.6-.7 1.5v32.3c0 .8.7 1.5 1.5 1.5h35.2c.8 0 1.5-.7 1.5-1.5V17.3c0-.9-.5-1.5-.7-1.5h-2.2v-2.9h2.2c2 0 3.7 2 3.7 4.4v32.3C54 52 52 54 49.6 54"></path>
                <path d="M20.3 18.8c-.8 0-1.5-.7-1.5-1.5v-5.9c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5.9c-.1.8-.7 1.5-1.5 1.5m23.4 0c-.8 0-1.5-.7-1.5-1.5v-5.9c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v5.9c0 .8-.7 1.5-1.5 1.5M24.7 12.9h14.6v3H24.7zM12.9 21.7h38.2v3H12.9zM45.2 27.6h2.9v2.9h-2.9zM39.3 27.6h3v2.9h-3zM33.5 27.6h2.9v2.9h-2.9zM27.6 27.6h2.9v2.9h-2.9zM21.7 27.6h3v2.9h-3zM45.2 33.5h2.9v2.9h-2.9zM39.3 33.5h3v2.9h-3zM33.5 33.5h2.9v2.9h-2.9zM27.6 33.5h2.9v2.9h-2.9zM21.7 33.5h3v2.9h-3zM15.9 33.5h2.9v2.9h-2.9zM45.2 39.3h2.9v3h-2.9zM39.3 39.3h3v3h-3zM33.5 39.3h2.9v3h-2.9zM27.6 39.3h2.9v3h-2.9zM21.7 39.3h3v3h-3zM15.9 39.3h2.9v3h-2.9zM39.3 45.2h3v2.9h-3zM33.5 45.2h2.9v2.9h-2.9zM27.6 45.2h2.9v2.9h-2.9zM21.7 45.2h3v2.9h-3zM15.9 45.2h2.9v2.9h-2.9z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="col-span-2">
          <Select
            options={locations}
            onChange={(selectedOption) =>
              handleFieldChange("startLocation", selectedOption)
            }
            defaultValue={locations[0]}
            placeholder="Select starting location"
          />
        </div>
        <div className="col-span-2">
          <Select
            options={locations}
            onChange={(selectedOption) =>
              handleFieldChange("arriveLocation", selectedOption)
            }
            defaultValue={locations[2]}
            placeholder="Select arriving location"
          />
        </div>
        <div className="col-span-2">
          <Select
            options={timePeriodOptions}
            onChange={(selectedOption) =>
              handleFieldChange("selectedTimePeriod", selectedOption)
            }
            defaultValue={timePeriodOptions[0]}
            placeholder="Select time period"
          />
        </div>
        <div onClick={filterData} className="w-full">
          <button className="h-[38px] w-full flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
