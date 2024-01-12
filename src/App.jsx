import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateLoader } from "./features/bookingSlice";
import Profile from "./pages/Profile/Profile";
import { getLoaderUpdate, showCurrentUser } from "./features/api";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { fetchBookingsData, fetchBusData } from "./features/bookingThunk";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = showCurrentUser();
  const loader = getLoaderUpdate();

  useEffect(() => {
    dispatch(fetchBusData());
    dispatch(fetchBookingsData());
  }, [dispatch]);

  // firebase auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          dispatch(
            updateCurrentUser({
              name: user.displayName || "",
              number: user.phoneNumber || "",
            })
          );
          const userData = JSON.parse(localStorage.getItem("userData"));
          if (userData) {
            dispatch(updateCurrentUser(userData));
          }
        }

        // Update loader after getting user or encountering an error
        dispatch(updateLoader(false));
      },
      (error) => {
        // Handle the case when there's an error during authentication
        console.error("Authentication error:", error);
        dispatch(updateLoader(false));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const ProtectedRoutes = ({ children }) => {
    const user = showCurrentUser();
    const loader = getLoaderUpdate();

    let location = useLocation();

    if (loader) {
      return "Loading......";
    }

    if (!user?.name) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
