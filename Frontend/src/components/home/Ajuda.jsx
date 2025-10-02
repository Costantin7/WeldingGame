import { useEffect, useState } from "react";
import { getText } from "../../ftexto";
function Ajuda(props) {
  // State para controlar a visibilidade e acionar a animação
  const [isShowing, setIsShowing] = useState(false);

  // useEffect para a animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o modal com animação de saída
  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      props.desativar(0);
    }, 300);
  };

  return (
    // O container do componente agora é o próprio backdrop
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300
        ${isShowing ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Modal (Conteúdo) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-50 w-11/12 max-w-2xl h-auto max-h-[85vh] overflow-y-auto bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 font-serif transition-all duration-300
          ${
            isShowing
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }
        `}
      >
        {/* Usando o 'X' no mesmo estilo do componente anterior */}
        <div
          className="place-self-end w-8 flex justify-end px-4 py-1 cursor-pointer"
          onClick={handleClose}
        >
          <p>❌</p>
        </div>

        {/* Conteúdo original do componente Ajuda */}
        <p className="underline my-2 text-xl font-bold">
          {" "}
          {getText({
            lang: props.lang,
            endereco: "Ajuda.ajuda",
          })}
        </p>
        <div className="bg-gray-300 w-full h-1 mb-6 "></div>
        <p className=" my-4 text-l font-bold">
          {" "}
          {getText({
            lang: props.lang,
            endereco: "Ajuda.Menu",
          })}
        </p>
        <p>
          {getText({
            lang: props.lang,
            endereco: "Ajuda.aoSelecionarOMenu",
          })}
        </p>
        <p>
          {getText({
            lang: props.lang,
            endereco: "Ajuda.naSecaoFeedback",
          })}
        </p>
        <p>
          {" "}
          {getText({
            lang: props.lang,
            endereco: "Ajuda.naSecaoAjuda",
          })}
        </p>
        <p>
          {getText({
            lang: props.lang,
            endereco: "Ajuda.naSecaoSobreNos",
          })}
        </p>

        <button className="!bg-blue-400">
          <p>
            {" "}
            {getText({
              lang: props.lang,
              endereco: "Ajuda.proximaTela",
            })}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Ajuda;
