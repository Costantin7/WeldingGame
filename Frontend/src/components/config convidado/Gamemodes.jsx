import React, { useState } from "react";

function Gamemodes(props) {
  const [ativo, setAtivo] = useState(true);
  const butt = () => {
    setAtivo(!ativo);
  };

  return (
    <div
      className={
        ativo
          ? " border w-[250px] h-[90px] border !bg-white rounded-md shadow-xl"
          : "w-[250px] h-[90px] border !bg-gray-300 rounded-md shadow-xl border "
      }
      onClick={butt}
    >
      <p className="underline font-serif mt-1">{props.texto}</p>

      <p className="font-serif mt-1">{props.legenda}</p>
    </div>
  );
}
export default Gamemodes;
