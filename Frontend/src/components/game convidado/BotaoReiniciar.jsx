function BotaoReiniciar(props) {
  return (
    <div className="mx-2 my-2 flex justify-end">
      <button
        onClick={() => {
          props.setCheckResposta(0);
          props.valor();
          props.setTempoGastoTotal(0);
        }}
        className="my-2 w-[150px] h-[40px] border !bg-yellow-400 rounded-md shadow-lg"
      >
        <p className="font-serif">Reiniciar</p>
      </button>
    </div>
  );
}

export default BotaoReiniciar;
