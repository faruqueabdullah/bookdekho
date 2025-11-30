import { Route, Routes } from "react-router-dom";
//CSS
import "./App.css";

//Pages
import Home from "../src/pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Listining from "./pages/Listining";

//components

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/book/list" element={<Listining />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/userlogin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
