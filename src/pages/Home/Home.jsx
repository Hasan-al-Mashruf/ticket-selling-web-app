import React, { useEffect, useRef, useState } from "react";
import SearchFilter from "../../components/searchFilter/SearchFilter/SearchFilter";
import BusData from "../../components/BusData/BusData";
import Hero from "../../components/Hero/Hero";
import { useSelector } from "react-redux";
import BusCard from "../../components/BusCard/BusCard";
import { getBusData } from "../../features/api";
import Header from "../../components/Header/Header";
import ShowReview from "../../components/ShowReview/ShowReview";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [showBusDts, setShowBusDts] = useState("");
  const [displayAll, setDisplayAll] = useState(false);
  const busDetailsRef = useRef(null);
  const busData = getBusData();

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-14">
        <Hero
          setShowBusDts={setShowBusDts}
          showBusDts={showBusDts}
          busDetailsRef={busDetailsRef}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          busData={busData}
        />
        <SearchFilter />
        <BusData
          setShowBusDts={setShowBusDts}
          showBusDts={showBusDts}
          busDetailsRef={busDetailsRef}
          displayAll={displayAll}
          setDisplayAll={setDisplayAll}
          busData={busData}
        />
      </div>
      <ShowReview />
      <Footer />
    </div>
  );
};

export default Home;
