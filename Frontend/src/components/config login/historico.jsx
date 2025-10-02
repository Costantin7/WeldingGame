import React, { useState } from "react";
import MenuHistorico from "./MenuHistorico";
import { getText } from "../../ftexto";
function Historico(props) {
  const [ativo, setAtivo] = useState(false);
  return (
    <div className=" mx-auto my-8">
      {ativo === true && (
        <MenuHistorico lang={props.lang} desativar={setAtivo} />
      )}
      <button onClick={() => setAtivo(!ativo)} className="!bg-transparent">
        <img src="./src/img/Historico.png" />
      </button>
      <p>
        {getText({
          lang: props.lang,
          endereco: "Historico.historico",
        })}
      </p>
    </div>
  );
}

export default Historico;
