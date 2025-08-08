import { useEffect, useState } from "react";

function Resgistrar(props) {
  const [close, setClose] = useState(false);
  const [nome, setNome] = useState("Insira seu nome");
  const [apelido, setApelido] = useState("Insira seu apelido");
  const [email, setEmail] = useState("Insira seu email");
  const [senha, setSenha] = useState("Insira sua senha");
  const [confirmarsenha, setConfirmarsenha] = useState("Confirme sua senha");
  const [instituicao, setInstituicao] = useState("Insira sua instituicao");
  const [pais, setPais] = useState("Insira seu pais");
  const [profissao, setProfissao] = useState("Insira sua profissão");
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
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40"
      ></div>

      {/* O pop-up de registro agora é um único elemento com posicionamento corrigido */}
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center bg-white border border-black rounded-xl shadow-lg p-6 w-150 h-180 font-serif">
        <p className="font-semibold !self-center text-xl">Registro</p>
        <div className="bg-gray-300 w-full h-1 mb-6"></div>

        <p className="font-semibold text-left">Nome: </p>
        <input
          className="border w-full mb-5"
          type="text"
          value={nome}
          onFocus={() => {
            if (nome === "Insira seu nome") {
              setNome("");
            }
          }}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <div>
          <p className="font-semibold text-left">Apelido: </p>
          <input
            className="border w-full mb-5"
            type="text"
            value={apelido}
            onFocus={() => {
              if (apelido === "Insira seu apelido") {
                setApelido("");
              }
            }}
            onChange={(e) => {
              setApelido(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-left">E-mail: </p>
          <input
            className="border w-full mb-5"
            type="text"
            value={email}
            onFocus={() => {
              if (email === "Insira seu email") {
                setEmail("");
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <p className="font-semibold text-left">Senha: </p>
          <input
            className="border w-full mb-5"
            type="text"
            value={senha}
            onFocus={() => {
              if (senha === "Insira sua senha") {
                setSenha("");
              }
            }}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          />
        </div>

        <div>
          <p className="font-semibold text-left">Confirmar Senha: </p>
          <input
            className="border w-full mb-5"
            type="text"
            value={confirmarsenha}
            onFocus={() => {
              if (confirmarsenha === "Confirme sua senha") {
                setConfirmarsenha("");
              }
            }}
            onChange={(e) => {
              setConfirmarsenha(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-row ">
          <div className="flex flex-col mr-25">
            <div>
              <p className="font-semibold text-left">Instituição: </p>
              <input
                className="border w-full mb-5"
                type="text"
                value={instituicao}
                onFocus={() => {
                  if (instituicao === "Insira sua instituicao") {
                    setInstituicao("");
                  }
                }}
                onChange={(e) => {
                  setInstituicao(e.target.value);
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-left">Pais: </p>
              <input
                className="border w-full mb-5"
                type="text"
                value={pais}
                onChange={(e) => {
                  setPais(e.target.value);
                }}
                onFocus={() => {
                  if (pais === "Insira seu pais") {
                    setPais("");
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col ml-25">
            <div>
              <p className="font-semibold text-left">Profissão: </p>
              <input
                className="border w-full mb-5"
                type="text"
                value={profissao}
                onFocus={() => {
                  if (profissao === "Insira sua profissão") {
                    setProfissao("");
                  }
                }}
                onChange={(e) => {
                  setProfissao(e.target.value);
                }}
              />
            </div>
            <div>
              <p className="font-semibold text-left">Escolaridade: </p>
              <input
                className="border w-full mb-5"
                type="text"
                value={escolaridada}
                onFocus={() => {
                  if (escolaridada === "Insira sua escolaridada") {
                    setEscolaridada("");
                  }
                }}
                onChange={(e) => {
                  setEscolaridada(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <button className="!bg-blue-400 justify-self-center">Cadastrar</button>
      </div>
    </div>
  );
}

export default Resgistrar;
