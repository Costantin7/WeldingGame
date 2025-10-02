import React from "react";
import { useState } from "react";
import MenuRanking from "./MenuRanking";
import MenuHistorico from "./MenuHistorico";
import { getText } from "../../ftexto";
function Rank(props) {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className=" mx-auto my-3">
      {ativo === true && <MenuRanking lang={props.lang} desativar={setAtivo} />}
      <button onClick={() => setAtivo(!ativo)} className="!bg-transparent">
        <img src="./src/img/trofeu.png" />
      </button>
      <p>
        {" "}
        {getText({
          lang: props.lang,
          endereco: "Rank.ranking",
        })}
      </p>
    </div>
  );
}

export default Rank;
