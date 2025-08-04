function BotaoDesistir(props) {
  return (
    <div className="mx-2 my-2 flex justify-end ">
      <button
        onClick={() => props.valor((level) => level - 1)}
        className="my-2 w-[150px] h-[40px] border !bg-red-600 rounded-md shadow-lg"
      >
        <p className="font-serif">Desistir</p>
      </button>
    </div>
  );
}

export default BotaoDesistir;
