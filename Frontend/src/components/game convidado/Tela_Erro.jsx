import { useEffect, useState } from "react";

// Usando desestruturação de props para deixar o código mais limpo
function TelaErro({ level, correctAnswer, explanation, onRestart, onExit }) {
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* 1. Backdrop (fundo) com onClick para fechar (chamando onExit) */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => {
          if (canClose) onExit();
        }}
      ></div>

      {/* 2. Janela do Pop-up (Modal) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white rounded-xl shadow-2xl font-serif">
        {/* Header do Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-red-600">Você errou!</h2>
          <button
            onClick={onExit}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Fechar"
          >
            &times; {/* 'X' de fechar */}
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          {/* Usando uma lista de descrição para semântica */}
          <dl className="space-y-3 text-gray-700">
            <div className="flex">
              <dt className="font-semibold w-32 shrink-0">Nível atingido:</dt>
              <dd className="font-mono">{level}</dd>
            </div>
            <div className="flex">
              <dt className="font-semibold w-32 shrink-0">Resposta correta:</dt>
              <dd>{correctAnswer}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-semibold mb-1">Explicação:</dt>
              <dd className="text-sm border-l-4 border-gray-200 pl-3">
                {explanation}
              </dd>
            </div>
          </dl>
        </div>

        {/* Footer do Modal com os botões de ação */}
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reiniciar
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaErro;
