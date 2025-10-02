import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getText } from "../../ftexto";
function Voltarhome(props) {
  return (
    <div>
      <Link to="/">
        <p className="text-black text-xl bold">
          {" "}
          {getText({
            lang: props.lang,
            endereco: "Voltarhome.ola",
          })}{" "}
          {props.username}!
        </p>
      </Link>
    </div>
  );
}
export default Voltarhome;
