import { Route, Routes } from "react-router-dom";
//Pages
import Home from "../src/pages/Home";
import Register from "./pages/Register";

//CSS
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
