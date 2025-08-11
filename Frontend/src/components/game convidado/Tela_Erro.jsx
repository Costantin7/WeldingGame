import { useEffect, useState } from "react";

function TelaErro(props) {
  const [close, setClose] = useState(false);
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    setTempo(props.actualTime);
  }, []);

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
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40 "
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-[600px] h-auto font-serif flex flex-col">
        <div
          className="place-self-end w-8 flex justify-center px-4 py-1 cursor-pointer items-center"
          onClick={() => {
            props.desativar(0);
          }}
        >
          <p>❌</p>
        </div>
        {tempo < 60 && (
          <div>
            <p className="font-bold text-xl">Você errou!</p>
            <div className="bg-gray-400 h-1 w-full"></div>{" "}
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
        )}
        {tempo >= 60 && (
          <div>
            <p className="font-bold text-xl">Você não respondeu a tempo!</p>
            <div className="bg-gray-400 h-1 w-full"></div>{" "}
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
        )}
      </div>
    </div>
  );
}

export default TelaErro;
