import React, { useState } from "react";

export default function Box({ id, label, clickEvent }) {
  const [color, setColor] = useState("");
  if (label === "X" && color!== 'red') {
    setColor("red");
  } else if (label === "O" && color!== 'green') {
    setColor("green");
  }
  return (
    <div className={`${color} grid-item border`} id={id} onClick={clickEvent}>
      {label}
    </div>
  );
}
