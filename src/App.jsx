import Merge from "./pages/converstions/Merge";


import { Route, Routes } from "react-router-dom";

import  Home  from "./pages/Home";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/merge-pdf' element={<Merge />} />
         
      </Routes>
    </>
  );
}

export default App;
