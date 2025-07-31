function Respostas(props) {
  const butt = () => {
    if (props.ativo == false) {
      props.ativar();
    } else if (props.ativo == true) {
      props.desativar();
    }
  };

  return (
    <div>
      {props.modo == 0 && ( // caso ainda não tenha apertado o botão responder
        <button
          className={
            props.ativo
              ? " w-full h-full max-w-xl text-center border border-black-800 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-blue-300 rounded-md shadow-lg"
              : " w-full h-full max-w-xl text-center border border-black-800 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-white rounded-md shadow-lg"
          }
          onClick={butt}
        >
          <p className="font-serif">{props.texto}</p>
        </button>
      )}
      {props.modo == 1 && ( // caso tenha apertado o botão responder e acertado
        <button
          className={
            props.gabaritoDesse == props.gabarito
              ? "w-full  h-full max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-green-300 rounded-md shadow-lg"
              : "w-full  h-full max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-gray-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-white rounded-md shadow-lg"
          }
        >
          <p className="font-serif">{props.texto}</p>
        </button>
      )}
      {props.modo == -1 && ( // caso tenha apertado o botão responder e errado
        <button
          className={
            props.gabaritoDesse != props.gabarito
              ? "w-full  h-full max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-blue-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-red-300 rounded-md shadow-lg"
              : "w-full  h-full max-w-xl text-center border border-gray-400 rounded-lg p-3 bg-white hover:bg-blue-100 cursor-pointer transition-all duration-200 my-2 w-auto h-auto border !bg-green-300 rounded-md shadow-lg"
          }
        >
          <p className="font-serif">{props.texto}</p>
        </button>
      )}
    </div>
  );
}

export default Respostas;
