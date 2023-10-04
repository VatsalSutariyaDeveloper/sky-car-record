import React from 'react';
import { Navbar, Hero } from "./components";
import { Routes, Route } from "react-router-dom";
import { Auth, AuthGuard } from "./components/Auth"; // Correct import path
import Login from "./components/Login";
import CreateBooking from "./components/BookUser/CreateBooking";
import UpdateBooking from "./components/BookUser/UpdateBooking";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <>
      {window.location.pathname !== '/login' && <Navbar />} 
      <Routes>
        <Route index element={<Hero />} />
        <Route path="login" element={<AuthGuard element={<Login />} />} />
        <Route path="edit-booking/:id" element={<Auth element={<UpdateBooking />} />} />
        <Route path="add-booking" element={<Auth element={<CreateBooking />} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
