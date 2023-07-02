import React, { useEffect } from "react";
import "./styles/global.css";
import "./assets/fonts/beermoney.css";
import webpack from "./assets/images/webpack.svg";
import { sum } from "./helpers/sum";
import { typedSum } from "./helpers/typedSum";
import { Link, Route, Routes } from "react-router-dom";
import Home from "~/pages/Home";
import Child from "@/pages/Child";
import axios from "axios";

const App = () => {
  console.log(process.env.URL);

  useEffect(() => {
    console.log(sum(3, 5));
    console.log(typedSum(3, 6));
    (async function(){
      try{
        const res = await axios.get("/api")
        console.log(res);
      }catch(e){
        console.log(e);
      }
    })()
  }, []);

  return (
    <div className="app">
      <img src={webpack} />
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
