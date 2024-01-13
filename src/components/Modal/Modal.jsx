import React, { useRef, useState } from "react";
import ReactRating from "../ReactRating/ReactRating";
import toast, { Toaster } from "react-hot-toast";
import { showCurrentUser } from "../../features/api";
const Modal = ({
  bookingData,
  setIsShowModal,
  isShoeModal,
  setIsReview,
  isReview,
}) => {
  const user = showCurrentUser();
  const [starRating, setStarRating] = useState(null);
  const busName = bookingData?.bookingDetails[0]?.name;
  const textAreaRef = useRef();

  const getReview = () => {
    const message = textAreaRef.current.value;
    if (!message || !starRating) {
      toast.error("Please Provide Full review......");
      return;
    }
    const review = { message, starRating, busName, reviewer: user?.name };
    saveMsgToDb(review);
  };

  const saveMsgToDb = async (review) => {
    try {
      const response = await fetch(
        "https://ticket-selling-web-app-server-side.vercel.app/review",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        }
      );
      const result = await response.json();

      if (result.acknowledged) {
        setIsShowModal(false);
        const updatedIsReview = [...isReview, busName];
        setIsReview(updatedIsReview);

        // Update localStorage with the updated isReview
        localStorage.setItem("isReview", JSON.stringify(updatedIsReview));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      className={`${
        isShoeModal ? "bg-[#00000094]" : ""
      } fixed h-[100vh] top-0 left-0 right-0 z-50`}
    >
      <div className="absolute top-1/2 md:w-2/4 w-full left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-[#393e43e6] p-6 h-[45vh] flex items-center w-full rounded-sm">
          <div className="grid md:grid-cols-2 w-full gap-7">
            <textarea
              ref={textAreaRef}
              name=""
              id=""
              cols="30"
              rows="8"
              placeholder="Write your review Here"
              className="p-5 rounded-md border border-orange-300"
            ></textarea>

            <div className="flex flex-col  justify-between">
              <div>
                <h4 className="text-white font-medium text-xl">{busName}</h4>
                <ReactRating
                  starSize={34}
                  starColor={"aliceblue"}
                  setStarRating={setStarRating}
                />
              </div>
              <button
                onClick={getReview}
                className="h-[38px] flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Modal;
