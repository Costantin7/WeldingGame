import { getText } from "../../ftexto";
function Subtitulo(props) {
  return (
    <p className="font-serif text-black text-shadow text-[clamp(0.5rem,1.2vw,3rem)]">
      {" "}
      {getText({ lang: props.lang, endereco: "Subtittle.jogoDeSoldagem" })}
    </p>
  );
}

export default Subtitulo;
