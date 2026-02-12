import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Hero from "./pages/Hero";
import Introduce from "./pages/Introduce";
import Result from "./pages/Result";
import Select from "./pages/Select";
import Analysis from "./pages/Analysis";
import Demographics from "./pages/Demographics";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/result" element={<Result />} />
          <Route path="/select" element={<Select />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/demographics" element={<Demographics />} />
          <Route path="/summary" element={<Demographics />} />

          {/* Unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
