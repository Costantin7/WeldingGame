import React from "react";
import { getText } from "../../ftexto.js";

function Tittle(props) {
  return (
    <p className="font-serif font-extrabold text-black text-shadow text-[clamp(1rem,2.5vw,3rem)]">
      {getText({ lang: props.lang, endereco: "Tittle.jogoDeSoldagem" })}
    </p>
  );
}

export default Tittle;
