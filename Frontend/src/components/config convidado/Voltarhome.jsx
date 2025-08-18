import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Voltarhome(props) {
  return (
    <div>
      <Link to="/">
        <p className="text-black text-xl bold">← Olá {props.username}!</p>
      </Link>
    </div>
  );
}
export default Voltarhome;
