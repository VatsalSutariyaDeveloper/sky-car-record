import { Navbar, Hero } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
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

export default App;
