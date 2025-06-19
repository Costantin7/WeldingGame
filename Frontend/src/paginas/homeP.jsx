import React from "react";
import Tittle from "../components/home/Tittle";
import Subtitulo from "../components/home/Subtitulo";
import ImagemCentral from "../components/home/ImagemCentral";
import Empresas from "../components/home/Empresas";
import BotaoLogin from "../components/home/BotaoLogin";
import BotaoIdioma from "../components/home/Botaoidioma";
import Linha from "../components/home/LinhaHorizontal";
import Configjogo from "../components/config convidado/Configjogo";
import Botaomenu from "../components/home/Botaomenu";
import { useEffect } from "react";

function Home_P(props) {
  useEffect(() => {
    props.startgameprop();
  }, []);
  //useEffect(() => {props.resetmoduleprop();}, []);

  return (
    <div>
      <header>
        <Tittle />
        <Subtitulo />
      </header>

      <div className="flex justify-end gap-2 px-4">
        <BotaoIdioma
          langprops={props.idiomaprop}
          setlangUpprops={props.setIdiomaUpprop}
          setlangDownprops={props.setIdiomaDownprop}
          setIdioma={props.setIdioma}
        />

        <Botaomenu />
      </div>

      <BotaoLogin />

      <div className="relative h-[600px] justify-center items-center">
        <ImagemCentral
          link="./src/img/escada_transparente.jpg"
          nome="Escada de niveis"
          class="absolute w-full h-full z-10 object-contain mx-auto"
        />

        <ImagemCentral
          link="./src/img/Medinhos.png"
          nome="Escada de niveis"
          class="relative top-[30px] right-[-40px] h-[530px] z-20 object-contain mx-auto"
        />
      </div>

      <Linha />
      <p className="text-left font-serif ml-2 mt-2">Idealizadores</p>

      <footer className="flex gap-45 !mt-5">
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
