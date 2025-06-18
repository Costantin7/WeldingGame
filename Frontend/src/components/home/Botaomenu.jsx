import { useState } from "react";

function Botaomenu() {
  const [ativo, setAtivo] = useState(false);

  return (
    <div>
      {!ativo ? (
        <div className="font-serif">
          <button
            onClick={() => setAtivo(true)}
            className="shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] h-11 px-6 shadow-md !border !border-black !bg-white rounded-lg flex items-center ml-auto mb-10 hover:bg-gray-100 transition-all"
          >
            <p className="text-lg">≡ Menu</p>
          </button>
        </div>
      ) : (
        <div>
          <div className="fixed inset-0 backdrop-blur-sm z-40 !bg-white"></div>

          <div className="fixed top-20 right-10 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-64 font-serif">
            <button
              onClick={() => setAtivo(false)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              ← Menu
            </button>
            <button
              onClick={() => setAtivo(false)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Feedback
            </button>
            <button
              onClick={() => setAtivo(false)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Sobre nós
            </button>
            <button
              onClick={() => setAtivo(false)}
              className="!border !border-black shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !bg-white w-full py-2 px-4 text-left hover:bg-gray-100 rounded transition-all"
            >
              Ajuda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Botaomenu;
