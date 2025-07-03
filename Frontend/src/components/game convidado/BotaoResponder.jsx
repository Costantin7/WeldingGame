import { useState, useEffect } from "react";

function BotaoResponder(props) {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const marcadorAtual = props.selecionado(); // chama a função dinamicamente

    if (marcadorAtual !== 0) {
      setAtivo(1);
    } else {
      setAtivo(0);
    }
  }, [props.selecionado]); // depende da função, ou pode deixar [] se ela for estável

  function TestarAcerto() {
    const marcadorAtual = props.selecionado();

    if (marcadorAtual === props.gabarito) {
      props.valor((level) => level + 1);
    }

    props.deselectA();
    props.deselectB();
    props.deselectC();
    props.deselectD();
  }

  return (
    <div className="my-12 flex justify-end">
      <button
        onClick={TestarAcerto}
        className={
          ativo !== 0
            ? "my-2 w-[150px] h-[40px] border !bg-green-400 rounded-md shadow-lg"
            : "my-2 w-[150px] h-[40px] border !bg-gray-400 rounded-md shadow-lg"
        }
      >
        <p className="font-serif">Responder</p>
      </button>
    </div>
  );
}

export default BotaoResponder;
