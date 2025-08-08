import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function LoginUsuario(props) {
  const [close, setClose] = useState(false);
  const [text1, setText1] = useState("Insira o usuário aqui");
  const [text2, setText2] = useState("senha");
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

      <div className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-6 w-[480px] h-auto font-serif">
        <p className="font-semibold !self-center text-xl">Login</p>
        <div className="bg-gray-300 w-full h-1 my-4"></div>

        {/* ===== CAMPO USUÁRIO AJUSTADO ===== */}
        <label htmlFor="usuario" className="font-semibold self-start mb-1">
          Usuário:
        </label>
        <input
          id="usuario"
          className="border p-2 rounded w-full mb-5"
          type="text"
          value={text1}
          onFocus={() => {
            if (text1 === "Insira o usuário aqui") {
              setText1("");
            }
          }}
          onChange={(e) => {
            setText1(e.target.value);
          }}
        />

        {/* ===== CAMPO SENHA AJUSTADO ===== */}
        <label htmlFor="senha" className="font-semibold self-start mb-1">
          Senha:
        </label>
        <input
          id="senha"
          className="border p-2 rounded w-full mb-9"
          type="password"
          value={text2}
          onFocus={() => {
            if (text2 === "senha") {
              setText2("");
            }
          }}
          onChange={(e) => {
            setText2(e.target.value);
          }}
        />

        <Link to="/config_logado" className="self-center">
          <button className="!bg-blue-600 text-white !text-bold self-center">
            Fazer Login
          </button>
        </Link>

        <div className="flex flex-row justify-between w-full mt-6">
          <div className="flex flex-col items-center">
            <p className="text-sm">Não tem cadastro?</p>
            <p
              onClick={() => {
                if (close) {
                  props.desativar(3);
                }
              }}
              className="text-blue-800 underline cursor-pointer text-sm"
            >
              Fazer Registro
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="self-center text-sm">Esqueceu a senha?</p>
            <p
              onClick={() => {
                if (close) {
                  props.desativar(2);
                }
              }}
              className="text-blue-800 underline cursor-pointer self-center text-sm"
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
