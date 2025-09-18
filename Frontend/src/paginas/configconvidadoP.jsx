import Tittle from "../components/home/Tittle";
import Subtitulo from "../components/home/Subtitulo";
import Empresas from "../components/home/Empresas";
import BotaoIdioma from "../components/home/Botaoidioma";
import Linha from "../components/home/LinhaHorizontal";
import BotaoJogar from "../components/config login/Botaojogarlogado";
import Configjogo from "../components/config convidado/Configjogo";
import Botaomenu from "../components/home/Botaomenu";
import Voltarhome from "../components/config convidado/Voltarhome";
import { useEffect } from "react";

function Convidado_P(props) {
  useEffect(() => {
    props.resetmoduleprop();
    props.startgameprop();
  }, []);

  return (
    <div>
      <header>
        <Tittle />
        <Subtitulo />
      </header>

      <div className="flex justify-start gap-2 px-4">
        <Voltarhome username={" "} />
      </div>

      <div className="flex justify-end gap-2 px-4">
        <BotaoIdioma
          langprops={props.idiomaprop}
          setlangUpprops={props.setIdiomaUpprop}
          setlangDownprops={props.setIdiomaDownprop}
          setIdioma={props.setIdioma}
        />
        <Botaomenu />
      </div>

      <div className="flex justify-center gap-2 py-2 margin-6">
        <Configjogo
          func1={props.funcao1}
          func2={props.funcao2}
          func3={props.funcao3}
          func4={props.funcao4}
          setTimer={props.setTimer}
          modulo1={props.modulo1}
          modulo2={props.modulo2}
          modulo3={props.modulo3}
          modulo4={props.modulo4}
        />
      </div>

      <div className="mt-8">
        {" "}
        <BotaoJogar />
      </div>

      <div className="mt-16">
        <Linha></Linha>
      </div>

      <footer className="flex justify-between w-full mt-2 md:mt-3 lg:mt-4">
        <Empresas
          site="https://laprosolda.com"
          imagem="./src/img/lapro.png"
          nome="Logo Laprosolda"
        />

        <Empresas
          site="https://femec.ufu.br"
          imagem="./src/img/femec.png"
          nome="Logo Femec"
        />

        <Empresas
          site="https://ufu.br"
          imagem="./src/img/ufu.png"
          nome="Logo UFU"
        />

        <Empresas
          site="https://embrapii.org.br"
          imagem="./src/img/embrapii.png"
          nome="Logo Embrapii"
        />

        <Empresas
          site="https://petrobras.com.br"
          imagem="./src/img/petrobras.png"
          nome="Logo Petrobras"
        />
      </footer>
    </div>
  );
}

export default Convidado_P;
