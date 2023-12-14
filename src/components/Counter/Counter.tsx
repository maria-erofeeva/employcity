import React from "react";
import "./Counter.css";

function Counter({ exchange }: { exchange: number }) {
  return (
    <div className="CounterWrapper">
      <p>Актуальный курс:</p>
      <p>{exchange}</p>
    </div>
  );
}

export default Counter;
