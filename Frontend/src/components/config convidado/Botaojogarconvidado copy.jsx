import React from "react";
import { Link } from 'react-router-dom';


function Botaojogarconvidado() {
  return (
    <div className="mx-auto">
      <Link to="/welding_game_convidado">
        <button className="!bg-orange-400 !text-white !px-12 !py-2 !rounded-md">
          <p className="font-bold">
            Jogar
          </p>
        </button>
      </Link>
    </div>
  );
}

export default Botaojogarconvidado;
