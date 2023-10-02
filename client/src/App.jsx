import styles from "./style";
import { Navbar, Hero } from "./components";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";

const App = () => (
  <>
   <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Hero />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </>
);

export default App;
