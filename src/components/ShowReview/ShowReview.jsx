import React, { useEffect, useState } from "react";
import ReactRating from "../ReactRating/ReactRating";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ShowReview.css";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviewList = async () => {
      try {
        const response = await fetch("http://localhost:5000/review");
        const result = await response.json();

        const updatedReviews = await Promise.all(
          result?.map(async (review) => {
            let category = review.bus?.split("Shuttle Express");
            category = category[1]?.trim();

            const busResponse = await fetch(
              `http://localhost:5000/availableBus?category=${category}`
            );
            const busResult = await busResponse.json();

            return { ...review, busData: busResult };
          })
        );

        setReviews(updatedReviews);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getReviewList();
  }, []);

  return (
    <div className="container">
      <div className="pt-40 pb-4 overflow-x-hidden">
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3.2,
            },
          }}
          className="busSwiper"
        >
          {reviews?.map((review, index) => {
            const { bus, rating, reviewerList, messageList, busData } = review;
            const { description, image, name, category } = busData;
            return (
              <SwiperSlide key={index}>
                <div className=" border relative rounded-md pr-[30px] py-4 pl-5 h-[214px]">
                  <div>
                    <img
                      src={image}
                      alt=""
                      className="w-[200px] h-[140px] object-contain absolute -top-[120px] left-1/2 -translate-x-1/2"
                    />
                  </div>
                  <div className="absolute bg-[#FB923C] left-0 pl-4 pr-3 rounded-full rounded-s-none top-10">
                    <ReactRating rating={rating} />
                  </div>
                  <div className="absolute bg-[#FB923C] right-0 top-0 bottom-0 w-[30px]">
                    <div className="flex items-center justify-center w-full h-full">
                      <h4 className="rotate-90 text-white">{category}</h4>
                    </div>
                  </div>
                  <div className="mt-20">
                    <span>Total review : </span>{" "}
                    <b>{reviewerList?.length.toString().padStart(2, "0")}</b>
                    <p className="mt-2">
                      {" "}
                      {description.split(" ").slice(0, 13).join(" ")}{" "}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ShowReview;
