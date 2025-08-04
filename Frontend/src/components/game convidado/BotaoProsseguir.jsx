function BotaoProsseguir(props) {
  return (
    <div className="mx-2 my-2 flex justify-end">
      <button
        onClick={() => {
          props.valor((valor) => valor - 1);
          props.setCheckResposta(0);
        }}
        className="my-2 w-[150px] h-[40px] border !bg-blue-400 rounded-md shadow-lg"
      >
        <p className="font-serif">Prosseguir</p>
      </button>
    </div>
  );
}

export default BotaoProsseguir;
