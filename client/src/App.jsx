import { Navbar, Hero } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
<<<<<<< HEAD
import BookingForm from "./components/BookingForm.jsx";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route index element={<Hero />} />
      <Route path="car-booking" element={<BookingForm />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </>
);
=======
import CreateBooking from "./components/BookUser/CreateBooking"
import UpdateBooking from "./components/BookUser/UpdateBooking"

const App = () => {
  const location = useLocation();

  const showNavbarPaths = ["/","/add-booking","/update-booking"]; 

  const shouldShowNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="add-booking" element={<CreateBooking />} />
        <Route path="update-booking/:id" element={<UpdateBooking />} />
      </Routes>
    </>
  );
};
>>>>>>> 5b3c28725b3ac2bc0465820ce0dfcab8f2e7b2ae

export default App;
