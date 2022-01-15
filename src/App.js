import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Show from "./pages/Show";
import Starred from "./pages/Starred";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/show/:id" element={<Show />} />
        <Route path="*" element="Not Found" />
      </Routes>
    </>
  );
}

export default App;
