import React from "react";
import Soldadores from "./Soldadores";
import NivelSoldador from "./NivelSoldador";

function Lugarnaescada(props) {
  var valy0 = -props.level * 20 + 275;
  var valx0 = -props.level * 20 + 1040;
  var valy = -props.level * 24 + 260;
  var valx = -props.level * 44 + 920;

  if (props.level === 0) {
    return (
      <div
        className="relative z-45 w-[120px]"
        style={{ top: `${valy0}px`, left: `${valx0}px` }}
      >
        <img
          src={`./src/img/Soldadores/Nivel${props.level}.png`}
          alt={`nivel ${props.level}`}
        />
      </div>
    );
  } else {
    return (
      <div
        className="relative z-30 w-[220px]"
        style={{ top: `${valy}px`, left: `${valx}px` }}
      >
        <img
          src={`./src/img/Soldadores/Nivel${props.level}.png`}
          alt={`nivel ${props.level}`}
        />
      </div>
    );
  }
}

function EscadaJogo(props) {
  return (
    <div className="scale-[0.7] origin-top-left">
      <div className="w-screen relative">
        <img className="absolute" src={props.link} alt={props.nome} />
        <Lugarnaescada level={props.nivel} />
        <div className="flex absolute top-10 left-280 z-10">
          <NivelSoldador nivel={props.nivel} />
        </div>
      </div>
    </div>
  );
}

export default EscadaJogo;
