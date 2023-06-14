import React from "react";
import Button from "../components/Button/Button";
import avatar from "../assets/images/me.jpeg";

export default function Home() {
  return (
    <div>
      <h1>Main page</h1>
      <Button>test button</Button>
      <img src={avatar} alt="" />
    </div>
  );
}
