import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Starred from "./pages/Starred";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="*" element="Not Found" />
      </Routes>
    </>
  );
}

export default App;
