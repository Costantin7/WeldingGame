function Respostas(props) {
  const butt = () => {
    props.ativar();
  };

  return (
    <button
      className={
        props.ativo
          ? "w-full min-h-[55px] max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-blue-300 rounded-md shadow-lg"
          : "w-full min-h-[40px] max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-white rounded-md shadow-lg"
      }
      onClick={butt}
    >
      <p className="font-serif">{props.texto}</p>
    </button>
  );
}

export default Respostas;
