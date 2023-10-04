import { Navbar, Hero } from "./components";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import CreateBooking from "./components/BookUser/CreateBooking";
import UpdateBooking from "./components/BookUser/UpdateBooking";
import Error404 from "./components/Error404";

const App = () => {
  const location = useLocation();

  const showNavbarPaths = ["/", "/add-booking", "/update-booking"];

  const shouldShowNavbar = showNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} />
        <Route path="edit-booking/:id" element={<UpdateBooking />} />
        <Route path="add-booking" element={<CreateBooking />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
