import { useEffect, useState } from "react";

function Resgistrar(props) {
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

      <div className="flex flex-col justify-center items-center fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-150 h-120 font-serif">
        <p className="font-bold my-10">Registar usuário</p>
      </div>
    </div>
  );
}

export default Resgistrar;
