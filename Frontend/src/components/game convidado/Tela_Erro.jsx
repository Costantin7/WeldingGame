import { useEffect, useState } from "react";

function TelaErro(props) {
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div
        onClick={() => {
          if (close) {
            props.desativar(0);
          }
        }}
        className="fixed inset-0 backdrop-blur-sm z-40 "
      ></div>

      <div className="relative bottom-100 right-30 z-1000 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-150 h-80 font-serif">
        <div
          className="place-self-end w-8 flex justify-center px-4 py-1 cursor-pointer center-items"
          onClick={() => {
            props.desativar(0);
          }}
        >
          <p>❌</p>
        </div>
        <p className="font-bold text-xl">Você errou!</p>
        <div className="bg-gray-400 h-1"></div>
        <div className="my-2">
          <p>Nível atingido: *importar nivel</p>
          <p>Resposta correta: *importar resposta</p>
          <p>Explicação: *importar explicações </p>
        </div>
        <div className="flex flex-row justify-center mx-3 my-8">
          <button className=" mx-2 !bg-blue-500"> Reiniciar </button>
          <button className="mx-2 !bg-red-500"> Sair </button>
        </div>
      </div>
    </div>
  );
}

export default TelaErro;
