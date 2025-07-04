import { useState, useEffect } from "react";

function BotaoResponder(props) {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const marcadorAtual = props.selecionado();

    if (marcadorAtual !== 0) {
      setAtivo(1);
    } else {
      setAtivo(0);
    }
  }, [props.selecionado]);

  function TestarAcerto() {
    const marcadorAtual = props.selecionado();
    if (ativo === 1) {
      if (marcadorAtual === props.gabarito) {
        props.setCheckResposta(1);
      } else if (marcadorAtual != props.gabarito) {
        props.setCheckResposta(-1);
      }
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
            : "my-2 w-[150px] h-[40px] !bg-gray-400 rounded-md shadow-lg !cursor-default text-gray-500"
        }
      >
        <p className="font-serif">Responder</p>
      </button>
    </div>
  );
}

export default BotaoResponder;
