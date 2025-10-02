import { useState, useEffect } from "react";
import Feedback from "./Feedback";
import Sobrenos from "./Sobrenos";
import Ajuda from "./Ajuda";
import { getText } from "../../ftexto";

function Botaomenu(props) {
  const [ativo, setAtivo] = useState(0);
  const [close, setClose] = useState(false);

  useEffect(() => {
    // Reseta o estado 'close' quando o menu é aberto
    if (ativo === 1) {
      setClose(false);
      const timer = setTimeout(() => {
        setClose(true);
      }, 300); // Um pequeno delay para evitar que o menu feche instantaneamente ao ser clicado
      return () => clearTimeout(timer);
    }
  }, [ativo]);

  return (
    <div>
      {ativo === 0 && (
        <div className="font-serif">
          <button
            onClick={() => setAtivo(1)}
            className="shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] h-[clamp(1.25rem,4vw,2.75rem)] px-[clamp(0.4rem,1.5vw,1.5rem)] shadow-md !border !border-black !bg-white rounded-lg flex items-center ml-auto mb-10 hover:bg-gray-100 transition-all"
          >
            <p className="text-[clamp(0.5rem,1.5vw,1.125rem)]">
              {getText({ lang: props.lang, endereco: "Botaomenu.menu" })}
            </p>
          </button>
        </div>
      )}

      {ativo === 1 && (
        <div>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-10"
            onClick={() => {
              if (close) {
                setAtivo(0);
              }
            }}
          ></div>

          <div className="fixed top-20 right-10 z-20 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-64 font-serif">
            <button
              onClick={() => setAtivo(0)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              {getText({ lang: props.lang, endereco: "Botaomenu.menus" })}
            </button>
            <button
              onClick={() => setAtivo(2)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              {getText({ lang: props.lang, endereco: "Botaomenu.feedback" })}
            </button>
            <button
              onClick={() => setAtivo(3)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              {getText({ lang: props.lang, endereco: "Botaomenu.sobreNos" })}
            </button>
            <button
              onClick={() => setAtivo(4)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              {getText({ lang: props.lang, endereco: "Botaomenu.ajuda" })}
            </button>
          </div>
        </div>
      )}

      {ativo === 2 && (
        <div>
          <Feedback desativar={setAtivo} />
        </div>
      )}

      {ativo === 3 && (
        <div>
          <Sobrenos desativar={setAtivo} />
        </div>
      )}

      {ativo === 4 && (
        <div>
          <Ajuda desativar={setAtivo} />
        </div>
      )}
    </div>
  );
}

export default Botaomenu;
