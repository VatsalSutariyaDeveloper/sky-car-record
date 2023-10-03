import styles from "./style";
import { Navbar, Hero } from "./components";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
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

export default App;
