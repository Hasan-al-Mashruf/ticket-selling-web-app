import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalFoodItem } from "../../features/bookingSlice";
import { getTotalItem } from "../../features/api";

const MealBox = () => {
  const dispatch = useDispatch();

  const [allMealItem, setAllMealItems] = useState([
    { name: "coffee", quantity: 1, isChecked: false, price: 60 },
    { name: "sandwiches", quantity: 1, isChecked: false, price: 80 },
    { name: "juice", quantity: 1, isChecked: false, price: 100 },
    { name: "mealBox", quantity: 1, isChecked: false, price: 220 },
  ]);

  const handleCheckboxChange = (itemName) => {
    setAllMealItems(
      allMealItem.map((item) => {
        return item.name == itemName
          ? { ...item, isChecked: !item.isChecked }
          : item;
      })
    );
  };

  const handleQuantityChange = (itemName, increment) => {
    setAllMealItems(
      allMealItem.map((item) => {
        const newQuantity = item.quantity + increment;
        return item.name == itemName
          ? { ...item, quantity: newQuantity >= 0 ? newQuantity : 0 }
          : item;
      })
    );
  };
  const total = allMealItem.reduce(
    (total, item) =>
      item.isChecked ? total + item.price * item.quantity : total,
    0
  );
  useEffect(() => {
    const selectedItems = allMealItem.filter((item) => item.isChecked);

    dispatch(updateTotalFoodItem(selectedItems));
  }, [allMealItem, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-8">
          <div>
            <button
              className={`
        rounded-md text-xs uppercase font-medium bg-[#ffdaa0] text-[#ffdaa0] h-7 w-[36px]`}
            >
              A1
            </button>
            <span className="ml-2 text-sm">Available</span>
          </div>
          <div>
            <button
              className={`
        rounded-md text-xs uppercase font-medium bg-[#ffdaa0] text-[#ffdaa0] h-7 w-[36px] opacity-50`}
            >
              A1
            </button>
            <span className="ml-2 text-sm">Booked</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 bg-[#e8f4ff5e] p-4 rounded-sm">
        {allMealItem.map((item, index) => (
          <div key={index} className="grid grid-cols-5">
            <div className="col-span-2">
              <input
                type="checkbox"
                className="scale-110"
                id={item.name}
                name={item.name}
                value={item.name}
                checked={item.isChecked}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <label className="ml-2 capitalize text-sm" htmlFor={item.name}>
                {item.name}
              </label>
            </div>
            <div className="col-span-2 flex justify-center">
              {item.isChecked && (
                <div className="ml-4 flex items-center">
                  <button
                    className="w-5 h-5 flex items-center justify-center rounded-sm bg-orange-300"
                    onClick={() => handleQuantityChange(item.name, 1)}
                  >
                    +
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="w-5 h-5 flex items-center justify-center rounded-sm bg-orange-300"
                    onClick={() => handleQuantityChange(item.name, -1)}
                  >
                    -
                  </button>
                </div>
              )}
            </div>
            <div className="text-end">
              <h3 className="text-sm">{item.price * item.quantity} Tk</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-1 bg-[#e8f4ffc6] p-1 rounded-sm">
        <h3 className="text-md "> Total: {total}</h3>
      </div>
    </div>
  );
};

export default MealBox;
