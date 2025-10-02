import React from "react";
import { Link } from "react-router-dom";
import { getText } from "../../ftexto.js";
function Botaojogarlogado(props) {
  return (
    <div className="mx-auto">
      <Link to="/welding_game_convidado">
        <button className="!bg-orange-400 !text-white !px-12 !py-2 !rounded-md">
          <p className="font-bold">
            {getText({
              lang: props.lang,
              endereco: "Botaojogarlogado.jogar",
            })}
          </p>
        </button>
      </Link>
    </div>
  );
}

export default Botaojogarlogado;
