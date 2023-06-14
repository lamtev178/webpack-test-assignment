import React from "react";
import Button from "./components/Button/Button";
// import { ReactComponent as Webpack } from "./assets/Vector.svg";
import artem from "./assets/me.jpeg";

import "./styles/global.css";

const App = () => {
  console.log(process.env.URL);

  return (
    <div className="app">
      <h1>App</h1>
      <Button>test button</Button>
      <img src={artem} alt="" />
    </div>
  );
};

export default App;
