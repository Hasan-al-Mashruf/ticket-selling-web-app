import React from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../features/bookingSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user?.email);
        if (user?.email) {
          checkUserInDB(user);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const checkUserInDB = async (user) => {
    const email = user?.email;
    console.log(email);
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${email}`
      );
      const result = await response.json();
      console.log(result);
      if (result?.email) {
        dispatch(
          updateCurrentUser({
            name: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            userid: result?._id,
          })
        );
        const userData = {
          name: auth?.currentUser?.displayName,
          email: auth?.currentUser?.email,
          userid: result?._id,
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
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
