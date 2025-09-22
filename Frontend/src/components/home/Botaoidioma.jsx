import { useState } from "react";
import MenuDeIdiomas from "./MenuDeIdiomas";

function BotaoIdioma(props) {
  const [ativo, setAtivo] = useState(0);

  function ativarMenu() {
    if (ativo === 0) {
      setAtivo(1);
    } else if (ativo === 1) {
      setAtivo(0);
    }
  }

  return (
    <div>
      <div className="flex font-serif">
        {ativo === 1 && (
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
          className="w-[30%] h-[clamp(2.25rem,4vw,2.75rem)] p-[clamp(0.5rem,0.5vw,0.75rem)] shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !border !border-black !bg-white flex items-center ml-auto mb-10 space-x-3"
        >
          {props.langprops === 0 && (
            <div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.2vw,1rem)]">
              <img
                className="w-[30%] object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/500px-Flag_of_Brazil.svg.png"
                alt="Bandeira do Brasil"
              />
              <p>Português</p>
              <p>▼</p>
            </div>
          )}

          {props.langprops === 1 && (
            <div className="flex items-center gap-[clamp(0.25rem,1vw,0.5rem)] text-[clamp(0.875rem,1.2vw,1rem)]">
              <img
                className="w-[30%] object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1280px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
                alt="Bandeira do Reino Unido"
              />
              <p>British</p>
              <p>▼</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
export default BotaoIdioma;
