import React, { useState } from "react";

function Gametype(props) {
  const [ativo, setAtivo] = useState(false);
  const butt = () => {
    setAtivo(!ativo);
  };

  return (
    <button
      className={
        ativo
          ? "w-[180px] h-[40px] border !bg-gray-300 rounded-md shadow-lg line-through"
          : "w-[180px] h-[40px] border !bg-white rounded-md shadow-lg "
      }
      onClick={() => {
        butt();
        props.define();
      }}
    >
      <p className="font-serif">{props.texto}</p>
    </button>
  );
}

export default Gametype;
