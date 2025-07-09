import { useState, useEffect } from "react";
import Feedback from "./Feedback";
import Sobrenos from "./Sobrenos";
import Ajuda from "./Ajuda";

function Botaomenu() {
  const [ativo, setAtivo] = useState(0);
  const [close, setClose] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {ativo == 0 && (
        <div className="font-serif">
          <button
            onClick={() => setAtivo(1)}
            className="shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] h-11 px-6 shadow-md !border !border-black !bg-white rounded-lg flex items-center ml-auto mb-10 hover:bg-gray-100 transition-all"
          >
            <p className="text-lg">≡ Menu</p>
          </button>
        </div>
      )}
      {ativo == 1 && (
        <div>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40 "
            onClick={() => {
              if (close == true) {
                setAtivo(0);
              }
            }}
          ></div>

          <div className="fixed top-20 right-10 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-64 font-serif">
            <button
              onClick={() => setAtivo(0)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              ← Menu
            </button>
            <button
              onClick={() => setAtivo(2)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Feedback
            </button>
            <button
              onClick={() => setAtivo(3)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Sobre nós
            </button>
            <button
              onClick={() => setAtivo(4)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Ajuda
            </button>
          </div>
        </div>
      )}

      {ativo == 2 && (
        <div>
          <Feedback desativar={setAtivo} />
        </div>
      )}

      {ativo == 3 && (
        <div>
          <Sobrenos desativar={setAtivo} />
        </div>
      )}

      {ativo == 4 && (
        <div>
          <Ajuda desativar={setAtivo} />
        </div>
      )}
    </div>
  );
}

export default Botaomenu;
