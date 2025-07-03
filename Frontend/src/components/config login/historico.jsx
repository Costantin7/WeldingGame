import React, { useState } from "react";
import MenuHistorico from "./MenuHistorico";

function Historico() {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className=" mx-auto my-8">
      {ativo === true && <MenuHistorico desativar={setAtivo} />}
      <button onClick={() => setAtivo(!ativo)} className="!bg-transparent">
        <img src="./src/img/Historico.png" />
      </button>
      <p>Histórico</p>
    </div>
  );
}

export default Historico;
