import { useEffect, useState } from "react";

function MenuDeIdiomas(props) {
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
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40"
        onClick={() => {
          if (close == true) {
            props.setAtivo(0);
          }
        }}
      ></div>
      <div className="fixed top-20 right-40 z-50 rounded-lg h=screen align-top p-4 bg-white shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] border flex flex-col ">
        <button
          className="mt-1 h-11 shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !border !border-black !bg-white flex p-4  mb-3 space-x-3"
          onClick={() => {
            props.setIdioma(0);
            props.setAtivo(0);
          }}
        >
          <div className="flex gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/500px-Flag_of_Brazil.svg.png"
            />
            <p>Português </p>
          </div>
        </button>

        <button
          className="h-11 shadow shadow-[3px_3px_1px_rgba(0,0,0,0.1)] !border !border-black !bg-white flex p-4 mb-2 space-x-3"
          onClick={() => {
            props.setIdioma(1);
            props.setAtivo(0);
          }}
        >
          <div className="flex gap-2">
            <img
              className="w-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/960px-Flag_of_the_United_States.svg.png"
            />
            <p>English</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default MenuDeIdiomas;
