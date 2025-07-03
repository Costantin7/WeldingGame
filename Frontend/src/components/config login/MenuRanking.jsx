import { useEffect, useState } from "react";

function MenuRanking(props) {
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
        className="fixed inset-0 flex justify-center items-center backdrop-blur-sm z-40 "
      ></div>
      <div className="p-6 pt-4 bottom-80 left-50 flex flex-col relative fixed z-50 bg-white border w-[50vw] h-[55vh]">
        <p className="text-xl font-semibold text-center mb-4">Ranking</p>
        <div className=" bg-gray-400 w-[1/2] h-[0.5vh] "></div>
        <div className="flex flex-row space-x-15 mx-6">
          <p>Posição</p>
          <p>Data</p>
          <p>Tempo</p>
          <p>Nivel Max</p>
          <p>Módulos</p>
        </div>
      </div>
    </div>
  );
}

export default MenuRanking;
