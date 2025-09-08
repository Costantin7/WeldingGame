import { useNavigate } from "react-router-dom";

function BotaoDesistir(props) {
  const navigate = useNavigate();

  function handleClick() {
    props.valor(0);
    navigate(-1);
  }

  return (
    <div className="mx-2 my-2 flex justify-end">
      <button
        onClick={handleClick}
        className="my-2 w-[150px] h-[40px] border !bg-red-600 rounded-md shadow-lg"
      >
        <p className="font-serif">Sair</p>
      </button>
    </div>
  );
}

export default BotaoDesistir;
