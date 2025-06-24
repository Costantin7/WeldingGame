function BotaoResponder(props) {
  var marcador = props.selecionado();

  function TestarAcerto() {
    if (marcador === props.gabarito) {
      props.valor((level) => level + 1);
      props.deselectA();
      props.deselectB();
      props.deselectC();
      props.deselectD();
    }
  }

  return (
    <div className="my-12 flex justify-end ">
      <button
        onClick={TestarAcerto}
        className="my-2 w-[150px] h-[40px] border !bg-green-400 rounded-md shadow-lg"
      >
        <p className="font-serif">Responder</p>
      </button>
    </div>
  );
}

export default BotaoResponder;
