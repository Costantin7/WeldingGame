import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function LoginUsuario(props) {
  const [close, setClose] = useState(false);
  const [text1, setText1] = useState("  Insira o usuário aqui");
  const [text2, setText2] = useState("  Insira a senha aqui");
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

      <div className="items-start justify-start flex flex-col fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-5  w-120 h-95 font-serif">
        <p className="font-semibold !self-center text-xl	">Login</p>
        <div className="bg-gray-300 w-full h-1 mb-6 "></div>

        <p className="font-semibold	">Usuário: </p>
        <input
          className="border w-full mb-5"
          type="text"
          value={text1}
          onChange={(e) => {
            setText1(e);
          }}
        />
        <p className="font-semibold	">Senha: </p>
        <input
          className="border w-full mb-9"
          type="text"
          value={text2}
          onChange={(e) => {
            setText2(e);
          }}
        />

        <Link to="/config_logado" className="self-center">
          <button className="!bg-blue-600 text-white !text-bold self-center">
            Fazer Login
          </button>
        </Link>
        <div className="flex flex-row mx-auto allign-start space-x-15">
          <div className="flex flex-col items-center">
            <p className="mt-5">Não tem cadastro? </p>
            <p
              onClick={() => {
                if (close) {
                  props.desativar(3);
                }
              }}
              className="text-blue-800 underline cursor-pointer "
            >
              Fazer Registro
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="self-center mt-5">Esqueceu a senha? </p>
            <p
              onClick={() => {
                if (close) {
                  props.desativar(2);
                }
              }}
              className="text-blue-800 underline cursor-pointer self-center "
            >
              Recuperar senha
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUsuario;
