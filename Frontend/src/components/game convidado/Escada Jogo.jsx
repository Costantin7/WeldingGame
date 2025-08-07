import React from "react";
import Soldadores from "./Soldadores";
import NivelSoldador from "./NivelSoldador";

function Lugarnaescada(props) {
  var valy0 = -props.level * 20 + 275;
  var valx0 = -props.level * 20 + 1040;
  var valy = -props.level * 24 + 260;
  var valx = -props.level * 44 + 920;
  var ofx = [-165, -190, -190, -220, -260, -260, -270, 0, 0];
  var ofy = [-25, -40, -47, -40, -30, -70, -60, 0, 0];
  var size = [
    200, 200, 185, 185, 195, 190, 170, 190, 190, 190, 190, 190, 190, 190,
  ];
  if (props.level === 0) {
    return (
      <div
        className="relative z-10 "
        style={{
          top: `${valy0 + ofy[props.level - 1]}px`,
          left: `${valx0 + ofx[props.level - 1]}px`,
        }}
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
        className="relative z-10 "
        style={{
          top: `${valy0 + ofy[props.level - 1]}px`,
          left: `${valx0 + ofx[props.level - 1]}px`,
          width: `${size[props.level - 1]}px`,
        }}
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
    <div className="min-w-[75vw] origin-top-left pt-75">
      <div className="w-full relative">
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
