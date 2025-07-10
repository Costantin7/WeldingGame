function Gametype(props) {
  return (
    <button
      className={
        props.ativo
          ? "!border w-[180px] h-[40px] border !bg-gray-300 rounded-md shadow-lg line-through"
          : "!border w-[180px] h-[40px] border !bg-white rounded-md shadow-lg"
      }
      onClick={() => props.define(!props.ativo)}
    >
      <p className="font-serif">{props.texto}</p>
    </button>
  );
}

export default Gametype;
