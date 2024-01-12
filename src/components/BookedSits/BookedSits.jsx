import React from "react";
import { getBookedSit } from "../../features/api";
import "./BookedSits.css";
import { FaUndoAlt } from "react-icons/fa";
import { bookSits } from "../../features/bookingSlice";
import { useDispatch } from "react-redux";
const calculateTotalFare = (bookedSit) => {
  return bookedSit.reduce((total, sit) => total + sit.fare, 0);
};
const BookedSits = ({ couch, setCouch, busImg }) => {
  const bookedSit = getBookedSit();
  const totalFare = calculateTotalFare(bookedSit);
  const dispatch = useDispatch();

  const unbookAsit = (sitName) => {
    dispatch(bookSits({ data: sitName }));
    const updatedCouch = couch.map((item) =>
      item.sit === sitName ? { ...item, isBooked: false } : item
    );
    setCouch(updatedCouch);
  };

  return (
    <div>
      {bookedSit?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>**</th>
              <th>Bus</th>
              <th>Sit number</th>
              <th>Fare</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookedSit?.map((sit, index) => {
              const { name: busName, sitName, fare } = sit;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{busName}</td>
                  <td>{sitName}</td>
                  <td>{fare}</td>
                  <td>
                    <FaUndoAlt
                      className="hover:rotate-[360deg] transition-transform duration-300 ease-in-out cursor-pointer"
                      onClick={() => unbookAsit(sitName)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <th></th>
              <th></th>
              <th>{totalFare}</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      ) : (
        <>
          <img src={busImg} alt="" />
        </>
      )}
    </div>
  );
};

export default BookedSits;
