import React, { useEffect, useState } from "react";
import "./FormValidation.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../features/bookingSlice";
import { showCurrentUser } from "../../features/api";
import OtpInput from "react-otp-input";

const FormValidation = () => {
  const dispatch = useDispatch();
  const user = showCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    let name = email.split("@");
    name = name[0].trim();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.email) {
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            if (auth.currentUser) {
              saveToDB(name, email);
            }
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  const saveToDB = async (name, email) => {
    const user = { name, email };
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      if (result.insertedId || result.message) {
        dispatch(
          updateCurrentUser({
            name: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            userid: result.insertedId,
          })
        );
        const userData = {
          name: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          userid: result.insertedId,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center flex-col"
      >
        <div className="relative mt-6">
          <label
            htmlFor=""
            className="text-[14px] absolute -top-[14px] bg-white left-2 px-2 font-normal text-[#222222d7]"
          >
            Email
          </label>
          <input
            type="email"
            autoComplete="off"
            {...register("email", {
              required: "Email is required",
              pattern: {
                // Add your email validation pattern here
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            className="border w-full px-3 py-1 rounded-sm pl-5 border-[#d7888853]"
            placeholder="......."
          />
          {errors.email && (
            <p
              role="alert"
              className="px-[6px] py-2 w-[max-content] text-sm ml-auto text-[#7c1717] underline"
            >
              {errors.email.type === "required"
                ? errors.email.message
                : errors.email.message}
            </p>
          )}
        </div>

        {/* Password input */}
        <div className="relative mt-6">
          <label
            htmlFor=""
            className="text-[14px] absolute -top-[14px] bg-white left-2 px-2 font-normal text-[#222222d7]"
          >
            Password
          </label>
          <input
            type="password"
            autoComplete="off"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="border w-full px-3 py-1 rounded-sm pl-5 border-[#d7888853]"
            placeholder="......."
          />
          {errors.password && (
            <p
              role="alert"
              className="px-[6px] py-2 w-[max-content] text-sm ml-auto text-[#7c1717] underline"
            >
              {errors.password.type === "required"
                ? errors.password.message
                : errors.password.message}
            </p>
          )}
        </div>

        {/* Rest of your existing code */}
        {/* ... */}

        <div className="mt-5 text-end">
          <button
            type="submit"
            className="border px-3 py-1 rounded-sm
            text-base text-[#222222d7] hover:border-cyan-50  hover:text-[#7c1717] hover:underline transition-all duration-300  ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormValidation;
