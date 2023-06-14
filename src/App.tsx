import React, { useEffect } from "react";
import "./styles/global.css";
import "./assets/fonts/beermoney.css";
import { sum } from "./helpers/sum";
import { typedSum } from "./helpers/typedSum";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Child from "./pages/Child";

const App = () => {
  console.log(process.env.URL);

  useEffect(() => {
    console.log(sum(3, 5));
    console.log(typedSum(3, 6));
  }, []);

  return (
    <div className="app">
      <ul>
        <li>
          <Link to="/">Main App</Link>
        </li>
        <li>
          <Link to="/main">Child App</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="main" element={<Child />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
