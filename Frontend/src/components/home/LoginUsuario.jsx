import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function LoginUsuario(props) {
  const [close, setClose] = useState(false);
  const [text1, setText1] = useState("  insira o usuário aqui");
  const [text2, setText2] = useState("  insira a senha aqui");
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
        <p className="font-bold my-10">Tela de login</p>
        <p>Usuário: "Textbox"</p>
        <input
          className="border"
          type="text"
          value={text1}
          onChange={(e) => {
            setText1(e);
          }}
        />
        <p>Senha: "Textbox" </p>
        <input
          className="border"
          type="text"
          value={text2}
          onChange={(e) => {
            setText2(e);
          }}
        />

        <Link to="/config_logado">
          <button className="!bg-blue-600 text-white !text-bold">
            Fazer Login
          </button>
        </Link>
        <p>Não tem cadastro? </p>
        <p
          onClick={() => {
            if (close) {
              props.desativar(3);
            }
          }}
          className="text-blue-800 underline cursor-pointer"
        >
          Fazer Registro
        </p>
        <p>Esqueceu a senha? </p>
        <p
          onClick={() => {
            if (close) {
              props.desativar(2);
            }
          }}
          className="text-blue-800 underline cursor-pointer"
        >
          Recuperar senha
        </p>
      </div>
    </div>
  );
}

export default LoginUsuario;
