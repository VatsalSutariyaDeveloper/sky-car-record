import React from 'react';
import { Navbar, Hero } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Auth, AuthGuard } from "./components/Auth"; // Correct import path
import Login from "./components/Auth/Login";
import CreateBooking from "./components/BookCar/CreateBooking";
import UpdateBooking from "./components/BookCar/UpdateBooking";
import ForgotPassword from './components/Auth/ForgotPassword';
import Error404 from "./components/Error404";

const App = () => {
  const location = useLocation();

  const showNavbarPaths = ["/", "/add-booking", "/update-booking"];

  const shouldShowNavbar = showNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
      <Route index element={<Auth element={<Hero />} />} />
        <Route path="login" element={<AuthGuard element={<Login />} />} />
        <Route path="forgot-password" element={<AuthGuard element={<ForgotPassword />} />} />
        <Route path="edit-booking/:id" element={<Auth element={<UpdateBooking />} />} />
        <Route path="add-booking" element={<Auth element={<CreateBooking />} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
