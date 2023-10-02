import styles from "./style";
import { Navbar, Hero } from "./components";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route index element={<Hero />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </>
);

export default App;
