import React from "react";

function Perguntas(props) {
  return (
    <div className="flex font-extrabold w-auto h-auto ">
      <p>
        Pergunta {props.nivel} - {props.pergunta}
      </p>
    </div>
  );
}

export default Perguntas;
