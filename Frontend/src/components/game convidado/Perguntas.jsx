import React from "react";

function Perguntas(props) {
  return (
    <div className="font-serif text-center max-w-1200 w-full min-h-[60px] flex font-extrabold w-auto h-auto ">
      <p>
        Pergunta {props.nivel} - {props.pergunta}
      </p>
    </div>
  );
}

export default Perguntas;
