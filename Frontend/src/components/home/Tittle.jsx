import React from "react";
import { getText } from "../../ftexto.js";
/**
 * Componente que renderiza o título do jogo, já traduzido.
 * @param {object} props - Propriedades do componente.
 * @param {number} props.lang - O idioma atual (0 para PT, 1 para EN).
 */
function Tittle(props) {
  return (
    <p className="font-serif font-extrabold text-black text-shadow text-[clamp(1rem,2.5vw,3rem)]">
      {getText({ lang: props.lang, endereco: "Tittle.jogoDeSoldagem" })}
    </p>
  );
}

export default Tittle;
