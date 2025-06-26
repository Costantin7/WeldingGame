import { useEffect, useState } from "react";

function Ajuda(props) {
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

      <div className="fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-150 h-120 font-serif">
        <div
          className="flex justify-end px-4 py-4 cursor-pointer "
          onClick={() => {
            props.desativar(0);
          }}
        >
          <p>x</p>
        </div>

        <p className="underline">Ajuda</p>
        <p className="underline justify-start">Menu</p>
        <p>
          Ao selecionar o menu, você conta com as opções de: Ajuda, Feedback e
          Sobre nós.{" "}
        </p>
        <p>
          Na seção Feedback, você pode nos escrever caso encontre algum erro no
          jogo, queira sugerir uma pergunta, ou não tenha entendido algo da
          jogabilidade.
        </p>
        <p>Na seção Ajuda, você encontra este tutorial do jogo.</p>
        <p>
          Na seção Sobre nós, você pode ler sobre quem desenvolveu o jogo, assim
          como seus patrocinadores.
        </p>

        <button className="!bg-blue-400">
          <p>Próxima Tela</p>
        </button>
      </div>
    </div>
  );
}

export default Ajuda;
