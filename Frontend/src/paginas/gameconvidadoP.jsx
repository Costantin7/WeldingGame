import React from "react";
import Tittle from "../components/home/Tittle";
import Subtitulo from "../components/home/Subtitulo";
import ImagemCentral from "../components/home/ImagemCentral";
import Empresas from "../components/home/Empresas";
import BotaoLogin from "../components/home/BotaoLogin";
import BotaoIdioma from "../components/home/Botaoidioma";
import Linha from "../components/home/LinhaHorizontal";
import Botaojogarconvidado from "../components/config login/Botaojogarlogado";
import Configjogo from "../components/config convidado/Configjogo";
import Botaomenu from "../components/home/BotaoMenu";
import Voltarhome from "../components/config convidado/Voltarhome";
import Gametype from "../components/config convidado/Gametypes";
import Gamemodes from "../components/config convidado/Gamemodes";
import Rank from "../components/config login/rank";
import Perguntas from "../components/game convidado/Perguntas";
import Respostas from "../components/game convidado/Respostas";
import ImagemEnunciado from "../components/game convidado/ImagemEnunciado";
import LinhaProgresso from "../components/game convidado/Linha progresso";
import BotaoResponder from "../components/game convidado/BotaoResponder";
import BotaoDesistir from "../components/game convidado/BotaoDesistir";
import EscadaJogo from "../components/game convidado/Escada Jogo";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
function Game_convidado_P(props) {
  const [pergunta, setPergunta] = useState(null);
  const { nivel, Addlevel, Zerolevel } = props;
  const idioma = props.idiomaprop;

  const [ativoA, setAtivoA] = useState(false);
  const [ativoB, setAtivoB] = useState(false);
  const [ativoC, setAtivoC] = useState(false);
  const [ativoD, setAtivoD] = useState(false);

  useEffect(() => {
    if (ativoA === true) {
      setAtivoB(false);
      setAtivoC(false);
      setAtivoD(false);
    }
  }, [ativoA]);

  useEffect(() => {
    if (ativoD === true) {
      setAtivoA(false);
      setAtivoB(false);
      setAtivoC(false);
    }
  }, [ativoD]);

  useEffect(() => {
    if (ativoB === true) {
      setAtivoC(false);
      setAtivoD(false);
      setAtivoA(false);
    }
  }, [ativoB]);

  useEffect(() => {
    if (ativoC === true) {
      setAtivoD(false);
      setAtivoA(false);
      setAtivoB(false);
    }
  }, [ativoC]);

  const temasExcluidos = useMemo(() => {
    const temas = [];
    if (!props.modulo1) temas.push(1); // Processos
    if (!props.modulo2) temas.push(2); // Materiais
    if (!props.modulo3) temas.push(3); // Projeto
    if (!props.modulo4) temas.push(4); // Fabricação
    return temas;
  }, [props.modulo1, props.modulo2, props.modulo3, props.modulo4]);

  useEffect(() => {
    async function fetchPergunta() {
      try {
        const response = await axios.get("http://localhost:8000/perguntas/", {
          params: {
            idioma: idioma.toString(),
            nivel: nivel.toString(),
            tema1: temasExcluidos[0]?.toString(),
            tema2: temasExcluidos[1]?.toString(),
            tema3: temasExcluidos[2]?.toString(),
            tema4: temasExcluidos[3]?.toString(),
          },
        });
        setPergunta(response.data);
      } catch (error) {
        console.error("Erro ao buscar pergunta:", error);
        setPergunta(null);
      }
    }

    fetchPergunta();
  }, [
    nivel,
    idioma,
    temasExcluidos,
    props.modulo1,
    props.modulo2,
    props.modulo3,
    props.modulo4,
  ]);

  useEffect(() => {
    props.startgameprop();
  }, []);

  function VerAtivo() {
    if (ativoA === true) {
      return 1;
    } else if (ativoB === true) {
      return 2;
    } else if (ativoC === true) {
      return 3;
    } else if (ativoD === true) {
      return 4;
    }
  }

  return (
    <div>
      <p>
        {pergunta
          ? "DEBUG: Foi possível carregar as perguntas"
          : "DEBUG: Não foi possível carregar as perguntas"}
      </p>

      {pergunta && <p>gabarito: {Number(pergunta.gabarito) + 1} </p>}

      <div className="flex mx-auto gap-7">
        <div className="pl-10">
          {pergunta && (
            <div className="flex flex-col my-4 space-y-4">
              <Perguntas pergunta={pergunta.pergunta} nivel={nivel} />
              <Respostas
                texto={pergunta.resposta_0}
                ativar={() => setAtivoA(true)}
                ativo={ativoA}
              />
              <Respostas
                texto={pergunta.resposta_1}
                ativar={() => setAtivoB(true)}
                ativo={ativoB}
              />
              <Respostas
                texto={pergunta.resposta_2}
                ativar={() => setAtivoC(true)}
                ativo={ativoC}
              />
              <Respostas
                texto={pergunta.resposta_3}
                ativar={() => setAtivoD(true)}
                ativo={ativoD}
              />
            </div>
          )}
        </div>

        {/* <ImagemEnunciado /> */}
      </div>

      <LinhaProgresso nivel={nivel} />

      <div className="flex justify-end gap-4">
        <BotaoResponder
          valor={Addlevel}
          gabarito={pergunta && Number(pergunta.gabarito) + 1}
          selecionado={VerAtivo}
        />
        <BotaoDesistir valor={Zerolevel} />
      </div>

      <EscadaJogo
        link="./src/img/Escada Jogo.png"
        nome="Imagem Escada"
        nivel={nivel}
      />
    </div>
  );
}

export default Game_convidado_P;
