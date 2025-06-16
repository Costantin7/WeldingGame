import React, { useState } from "react";

function Respostas(props) {
  const butt = () => {
    props.ativar();
  };

  return (
    <button
      className={
        props.ativo
          ? "my-2 w-auto h-auto border !bg-blue-300 rounded-md shadow-lg"
          : "my-2 w-auto h-auto border !bg-white rounded-md shadow-lg"
      }
      onClick={butt}
    >
      <p className="font-serif">{props.texto}</p>
    </button>
  );
}

export default Respostas;
