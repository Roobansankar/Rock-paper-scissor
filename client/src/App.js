import React from "react";
import Main from "./Components/Main";
import ScoreData from "./Components/ScoreData";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {

  
  return (
    <div>
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/data" element={<ScoreData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
