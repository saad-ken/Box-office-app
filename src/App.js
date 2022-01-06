import {Route,Routes} from "react-router-dom";
import Home from "./components/Home";



function App() {
  return (
    <Routes>
     
     <Route index element={<Home/>} />

     <Route path="/star" element={<> <h1>star</h1> </>} />
    
     <Route path="*" element={<><h1>Page Not Found</h1></>} />
          
   </Routes>
  );
}

export default App;
