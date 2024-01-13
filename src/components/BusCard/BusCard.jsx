import React, { useEffect, useState } from "react";
import "./BusCard.css";
import { FaBity, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { getBusData } from "../../features/api";

const BusCard = ({ showBusDetails, busData }) => {
  const [randomIndexes, setRandomIndexes] = useState([]);
  const [imageIndexes, setImageIndexes] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    const shuffledData = [...busData];
    shuffleArray(shuffledData);

    const selectedIndexes = shuffledData
      .slice(0, 4)
      .map((item) => busData.indexOf(item));
    setRandomIndexes(selectedIndexes);
    setImageIndexes(Array(4).fill(0));
  }, [busData]);

  const showDetailsData = (id) => {
    showBusDetails(id);
  };

  const changeImage = (index, increment, busNumber) => {
    const lastIndex = busData[busNumber].locationimgs.length - 1;

    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes]; //shallow copy
      let newIndex = newIndexes[index] + increment;
      newIndex = newIndex > lastIndex ? 0 : newIndex;
      newIndex = newIndex < 0 ? lastIndex : newIndex;
      newIndexes[index] = newIndex;
      return newIndexes;
    });
  };

  return (
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 lg:px-0 px-4">
        {randomIndexes?.map((busNumber, index) => {
          const data = busData[busNumber];
          const imageIndex = imageIndexes[index];

          return (
            <article className="card cursor-pointer relative" key={index}>
              <img
                className="card__background "
                src={data?.locationimgs[imageIndex]}
                alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                width="1920"
                height="2193"
              />
              <div className="card__content | flow">
                <div className="card__content--container | flow text-white">
                  <h2 className="card__title">
                    {data?.boarding} To {data?.destination}
                  </h2>
                  <p className="card__description flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                      <h4>
                        Departure: <strong> {data?.departure_time}</strong>
                      </h4>
                    </li>
                    <li className="flex items-center gap-2">
                      <h4>
                        Fare: <strong> {data?.fare} Tk</strong>
                      </h4>
                    </li>
                  </p>
                </div>
                <button
                  className="card__button"
                  onClick={() => showDetailsData(data._id)}
                >
                  Show Details
                </button>
              </div>
              <div className="absolute left-1 z-10 text-white top-1/2 -translate-y-1/2 left-arrow">
                <FaChevronLeft
                  className="text-2xl"
                  onClick={() => changeImage(index, -1, busNumber)}
                />
              </div>
              <div className="absolute right-1 z-10 text-white top-1/2 -translate-y-1/2 right-arrow">
                <FaChevronRight
                  className="text-2xl"
                  onClick={() => changeImage(index, 1, busNumber)}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BusCard;
