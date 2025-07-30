function Gamemodes(props) {
  return (
    <div
      className={
        props.parameter
          ? "border w-[250px] h-[90px] !bg-white rounded-md shadow-xl"
          : "line-through border w-[250px] h-[90px] !bg-gray-300 rounded-md shadow-xl text-gray-500"
      }
    >
      <p className="underline font-serif mt-1">{props.texto}</p>

      <p className="font-serif mt-1">{props.legenda}</p>
    </div>
  );
}
export default Gamemodes;
