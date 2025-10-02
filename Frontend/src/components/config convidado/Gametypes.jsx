function Gametype(props) {
  return (
    <button
      className={`
        border w-[205px] h-[50px] rounded-md shadow-md flex items-center justify-start px-3 gap-3 transition-all duration-200
        ${
          props.ativo
            ? "border-blue-500 !bg-white" // Estilo ATIVO
            : "border-gray-300 !bg-gray-100" // Estilo INATIVO
        }
      `}
      onClick={() => props.define(!props.ativo)}
    >
      {/* Elemento visual do Checkbox */}
      <div
        className={`
          w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-200
          ${
            props.ativo
              ? "border-blue-600 bg-blue-500" // Caixa ATIVA
              : "border-gray-400 bg-white" // Caixa INATIVA
          }
        `}
      >
        {/* Ícone de "check" que aparece apenas quando ativo */}
        {props.ativo && (
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

      {/* Texto */}
      <p
        className={`
          font-serif 
          ${
            props.ativo
              ? "text-gray-800" // Texto ATIVO
              : "text-gray-400" // Texto INATIVO
          }
        `}
      >
        {props.texto}
      </p>
    </button>
  );
}

export default Gametype;
