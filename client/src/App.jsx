import React from 'react';
import { Navbar, Hero } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Auth/Login";
import CreateBooking from "./components/BookUser/CreateBooking";
import UpdateBooking from "./components/BookUser/UpdateBooking";
import ForgotPassword from './components/Auth/ForgotPassword';
import Error404 from "./components/Error404";
import AllCars from './components/AllCars';
const App = () => {
  const location = useLocation();

  // Define routes where the Navbar should be shown
  const showNavbarPaths = ["/", "/add-booking", "/update-booking","/all-cars"];

  // Check if the current location pathname is in the showNavbarPaths array
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="add-booking" element={<CreateBooking />} />
        <Route path="update-booking/:id" element={<UpdateBooking />} />
        <Route path="forgot-password" element={<ForgotPassword /> }/>
        <Route path="all-cars" element={<AllCars /> }/>
        {/* <Route path="*" element={<Error404 />} /> */}
      </Routes>
    </>
  );
};

export default App;
