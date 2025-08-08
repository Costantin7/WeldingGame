import { useEffect, useState } from "react";

function RecuperarSenha(props) {
  const [emailText, setEmailText] = useState("Insira seu email");
  const [senha1, setSenha1] = useState("Insira a senha nova");
  const [senha2, setSenha2] = useState("Confirme a senha nova");
  const [c1, setC1] = useState();
  const [c2, setC2] = useState();
  const [c3, setC3] = useState();
  const [c4, setC4] = useState();
  const [c5, setC5] = useState();
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
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40"
      ></div>
      {tela == 0 && (
        <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-5 w-100 h-60 font-serif">
          <p className="font-bold mb-2">Recuperar senha</p>
          <div className="bg-gray-300 w-full h-1 mb-3 "></div>
          <p className="mb-3"> Insira seu e-mail cadastrado</p>
          <input
            className="!border w-full mb-5"
            type="text"
            value={emailText}
            onFocus={() => {
              if (emailText === "Insira seu email") {
                setEmailText("");
              }
            }}
            onChange={(e) => setEmailText(e.target.value)}
          ></input>

          <button
            onClick={() => setTela(1)}
            className="!bg-blue-600 text-white"
          >
            Obter código
          </button>
        </div>
      )}

      {tela == 1 && (
        <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-6 w-100 h-70 font-serif">
          <p className="font-bold my-3">Recuperar senha</p>
          <div className="bg-gray-300 w-full h-1 mb-5 "></div>
          <p>Insira o código recebido em seu email</p>
          <div className="flex flex-row mx-1 my-5">
            <input
              className="!border w-10 mx-1"
              type="number"
              value={c1}
              onChange={(e) => setC1(e.target.value)}
            ></input>
            <input
              className="!border w-10 mx-1 "
              type="number"
              value={c2}
              onChange={(e) => setC2(e.target.value)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={c3}
              onChange={(e) => setC3(e.target.value)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={c4}
              onChange={(e) => setC4(e.target.valuee)}
            ></input>
            <input
              className="!border w-10 mx-1"
              type="number"
              value={c5}
              onChange={(e) => setC5(e.target.value)}
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
        <div className="flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-6  w-100 h-80 font-serif">
          <p className="font-bold my-3">Recuperar senha</p>
          <div className="bg-gray-300 w-full h-1 mb-5 "></div>
          <p>Insira a nova senha</p>
          <input
            className="!border w-full mb-3"
            type="text"
            value={senha1}
            onFocus={() => {
              if (senha1 === "Insira a senha nova") {
                setSenha1("");
              }
            }}
            onChange={(e) => setSenha1(e.target.value)}
          ></input>
          <p>Confirme a nova senha</p>
          <input
            className="!border w-full mb-5"
            type="text"
            value={senha2}
            onFocus={() => {
              if (senha2 === "Confirme a senha nova") {
                setSenha2("");
              }
            }}
            onChange={(e) => setSenha2(e.target.value)}
          ></input>
          <button
            onClick={() => props.desativar(0)}
            className="!bg-blue-600 text-white "
          >
            enviar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecuperarSenha;
