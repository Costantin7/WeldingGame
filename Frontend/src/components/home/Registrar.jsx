import { useEffect, useState } from "react";

function Resgistrar(props) {
  const [close, setClose] = useState(false);
  const [nome, setNome] = useState("Insira seu nome");
  const [apelido, setApelido] = useState("Insira seu apelido");
  const [email, setEmail] = useState("Insira seu nome");
  const [senha, setSenha] = useState("Insira sua senha");
  const [confirmarsenha, setConfirmarsenha] = useState(
    "Insira seu confirmarsenha"
  );
  const [instituicao, setInstituicao] = useState("Insira sua instituicao");
  const [pais, setPais] = useState("Insira seu pais");
  const [profissao, setProfissao] = useState("Insira sua profissao");
  const [escolaridada, setEscolaridada] = useState("Insira sua escolaridada");

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

      <div className="relative fixed z-50 left-60 bottom-70">
        <div className="absolute flex flex-col justify-center bg-white border border-black rounded-xl shadow-lg p-6 w-150 h-180 font-serif ">
          <p className="font-semibold !self-center text-xl	">Registro</p>
          <div className="bg-gray-300 w-full h-1 mb-6 "></div>

          <p className="font-semibold text-left">Nome: </p>
          <input
            className="border w-full mb-5"
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e);
            }}
          />
          <div>
            <p className="font-semibold	text-left">Apelido: </p>
            <input
              className="border w-full mb-5"
              type="text"
              value={apelido}
              onChange={(e) => {
                setApelido(e);
              }}
            />
          </div>
          <div>
            <p className="font-semibold	text-left">E-mail: </p>
            <input
              className="border w-full mb-5"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e);
              }}
            />
          </div>
          <div>
            <p className="font-semibold	text-left">Senha: </p>
            <input
              className="border w-full mb-5"
              type="text"
              value={senha}
              onChange={(e) => {
                setSenha(e);
              }}
            />
          </div>

          <div>
            <p className="font-semibold	text-left">Confirmar Senha: </p>
            <input
              className="border w-full mb-5"
              type="text"
              value={confirmarsenha}
              onChange={(e) => {
                setConfirmarsenha(e);
              }}
            />
          </div>

          <div className="flex flex-row ">
            <div className="flex flex-col mr-25">
              <div>
                <p className="font-semibold	text-left">Instituição: </p>
                <input
                  className="border w-full mb-5"
                  type="text"
                  value={instituicao}
                  onChange={(e) => {
                    setInstituicao(e);
                  }}
                />
              </div>
              <div>
                <p className="font-semibold	text-left">Pais: </p>
                <input
                  className="border w-full mb-5"
                  type="text"
                  value={pais}
                  onChange={(e) => {
                    setPais(e);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col ml-25">
              <div>
                <p className="font-semibold	text-left">Profissao: </p>
                <input
                  className="border w-full mb-5"
                  type="text"
                  value={profissao}
                  onChange={(e) => {
                    setProfissao(e);
                  }}
                />
              </div>
              <div>
                <p className="font-semibold	text-left">Escolaridade: </p>
                <input
                  className="border w-full mb-5"
                  type="text"
                  value={escolaridada}
                  onChange={(e) => {
                    setEscolaridada(e);
                  }}
                />
              </div>
            </div>
          </div>
          <button className="!bg-blue-400 justify-self-center">
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resgistrar;
