import { useEffect, useState } from "react";

function RecuperarLogin(props) {
  const [emailText, setEmailText] = useState("insira seu email");
  const [senha1, setSenha1] = useState("*****1");
  const [senha2, setSenha2] = useState("*****2");
  const [close, setClose] = useState(false);
  const [tela, setTela] = useState(0);
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
      {tela == 0 && (
        <div className="flex flex-col justify-center items-center fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-100 h-80 font-serif">
          <p className="font-bold my-10">Recuperar senha</p>
          <p>insira seu e-mail cadastrado</p>
          <input
            className="!border w-full"
            type="text"
            value={emailText}
            onChange={(e) => setEmailText(e)}
          ></input>
          <button
            onClick={() => setTela(1)}
            className="!bg-blue-600 text-white"
          >
            enviar
          </button>
        </div>
      )}

      {tela == 1 && (
        <div className="flex flex-col justify-center items-center fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-100 h-80 font-serif">
          <p className="font-bold my-10">Recuperar senha</p>
          <p>Insira o código recebido em seu email</p>
          <div className="flex flex-row mx-1">
            <input
              className="!border w-10 mx-1"
              type="number"
              value={emailText}
              onChange={(e) => setEmailText(e)}
            ></input>
            <input
              className="!border w-10 mx-1 "
              type="number"
              value={emailText}
              onChange={(e) => setEmailText(e)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={emailText}
              onChange={(e) => setEmailText(e)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={emailText}
              onChange={(e) => setEmailText(e)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={emailText}
              onChange={(e) => setEmailText(e)}
            ></input>
          </div>
          <button
            onClick={() => setTela(2)}
            className="!bg-blue-600 text-white"
          >
            enviar
          </button>
        </div>
      )}

      {tela == 2 && (
        <div className="flex flex-col justify-center items-center fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-100 h-80 font-serif">
          <p className="font-bold my-10">Recuperar senha</p>
          <p>insira a nova senha</p>
          <input
            className="!border w-full"
            type="text"
            value={senha1}
            onChange={(e) => setSenha1(e)}
          ></input>
          <p>Confirme a nova senha</p>
          <input
            className="!border w-full"
            type="text"
            value={senha2}
            onChange={(e) => setSenha2(e)}
          ></input>
          <button
            onClick={() => props.desativar(0)}
            className="!bg-blue-600 text-white"
          >
            enviar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecuperarLogin;
