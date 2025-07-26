import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestAPI from "./pages/admin/TestAPI";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestAPI />} />
      </Routes>
    </Router>
  );
};

export default App;
