import React from "react";
import { useState } from "react";
import MenuRanking from "./MenuRanking";
import MenuHistorico from "./MenuHistorico";

function Rank() {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className=" mx-auto my-3">
      {ativo === true && <MenuRanking desativar={setAtivo} />}
      <button onClick={() => setAtivo(!ativo)} className="!bg-transparent">
        <img src="./src/img/trofeu.png" />
      </button>
      <p>Ranking</p>
    </div>
  );
}

export default Rank;
