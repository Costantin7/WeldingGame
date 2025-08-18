import React from "react";

function AparecerNoRanking(props) {
  // A função que lida com a lógica do clique continua a mesma
  const handleChange = () => {
    props.func1();
    props.func2();
    props.func3();
    props.func4();
    props.setTimer(!props.timer);
  };

  return (
    <div className="mx-20">
      {/* Usamos um <button> para ter a área clicável, 
        mas com estilos para parecer um texto simples com um ícone.
      */}
      <button
        onClick={handleChange}
        className="flex items-center cursor-pointer bg-transparent border-none p-2"
      >
        {/* --- Início do Bloco Visual Copiado de Gametype --- */}
        {/* 1. A caixinha externa */}
        <div
          className={`
            w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200
            ${
              props.timer // A condição agora usa 'props.timer'
                ? "border-blue-600 bg-blue-500" // Estilo ATIVO
                : "border-gray-400 bg-white" // Estilo INATIVO
            }
          `}
        >
          {/* 2. O ícone de "check" que aparece dentro da caixa */}
          {props.timer && ( // A condição para mostrar o check também usa 'props.timer'
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={4}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        {/* --- Fim do Bloco Visual Copiado --- */}

        {/* O texto fixo do componente */}
        <span className="ml-3 font-serif">Aparecer no Ranking</span>
      </button>
    </div>
  );
}

export default AparecerNoRanking;
