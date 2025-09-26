import Tittle from "../components/home/Tittle";
import Subtitulo from "../components/home/Subtitulo";
import ImagemCentral from "../components/home/ImagemCentral";
import Empresas from "../components/home/Empresas";
import BotaoLogin from "../components/home/BotaoLogin";
import BotaoIdioma from "../components/home/Botaoidioma";
import Linha from "../components/home/LinhaHorizontal";
import Botaomenu from "../components/home/Botaomenu";
import { useEffect } from "react";

function Home_P(props) {
  useEffect(() => {
    props.startgameprop();
  }, []);
  //useEffect(() => {props.resetmoduleprop();}, []);

  return (
    <div className="relative w-full max-w-[1372px] mx-auto aspect-[1372/858]">
      <header className="absolute top-[0%] right-[36%] flex-col items-center gap-[0.6vw] z-500">
        <Tittle lang={props.idiomaprop} />
        <Subtitulo lang={props.idiomaprop} />
      </header>

      <div className="absolute top-[5.5%] right-[2.9%] flex items-center gap-[0.6vw] z-500">
        <BotaoIdioma
          langprops={props.idiomaprop}
          setlangUpprops={props.setIdiomaUpprop}
          setlangDownprops={props.setIdiomaDownprop}
          setIdioma={props.setIdioma}
        />
        <Botaomenu lang={props.idiomaprop} />
      </div>

      <BotaoLogin setUsername={props.setUsername} lang={props.idiomaprop} />

      <div className="relative h-[80%] justify-center items-center">
        <ImagemCentral
          link="./src/img/escada_transparente.jpg"
          nome="Escada de niveis"
          class="absolute w-full h-full z-10 object-contain mx-auto"
        />

        <ImagemCentral
          link="./src/img/Medinhos.png"
          nome="Escada de niveis"
          class="absolute top-[5%] left-[25%] h-[90%] z-20 object-contain mx-auto"
        />
      </div>

      <Linha />

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

export default Home_P;
