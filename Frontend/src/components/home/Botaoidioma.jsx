import { useState } from "react";
import MenuDeIdiomas from "./MenuDeIdiomas";

function BotaoIdioma(props) {
  const [ativo, setAtivo] = useState(0);

  function ativarMenu() {
    if (ativo == 0) {
      setAtivo(1);
    } else if (ativo == 1) {
      setAtivo(0);
    }
  }

  return (
    <div>
      <div className="flex font-serif">
        {ativo == 1 && (
          <div>
            <MenuDeIdiomas
              setAtivo={setAtivo}
              setlangUpprops={props.setlangUpprops}
              setlangDownprops={props.setlangDownprops}
              setIdioma={props.setIdioma}
            />
          </div>
        )}

        <button
          onClick={ativarMenu}
          className=" h-11 shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !border !border-black !bg-white flex p-4 ml-auto mb-10 space-x-3"
        >
          {props.langprops == 0 && (
            <div className="flex gap-2">
              <img
                className="w-10"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/500px-Flag_of_Brazil.svg.png"
              />
              <p>Português </p>
              <p> ▼</p>
            </div>
          )}

          {props.langprops == 1 && (
            <div className="flex gap-2">
              <img
                className="w-10"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png"
              />
              <p>English</p>
              <p> ▼ </p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
export default BotaoIdioma;
