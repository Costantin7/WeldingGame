import Perguntas from "../components/game convidado/Perguntas";
import Respostas from "../components/game convidado/Respostas";
import LinhaProgresso from "../components/game convidado/Linha progresso";
import BotaoResponder from "../components/game convidado/BotaoResponder";
import BotaoDesistir from "../components/game convidado/BotaoDesistir";
import EscadaJogo from "../components/game convidado/Escada Jogo";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NivelSoldador from "../components/game convidado/NivelSoldador";
import BotaoProsseguir from "../components/game convidado/BotaoProsseguir";
import BotaoReiniciar from "../components/game convidado/BotaoReiniciar";
function Game_convidado_P(props) {
  const [pergunta, setPergunta] = useState(null);
  const { nivel, Addlevel, Zerolevel } = props;
  const idioma = props.idiomaprop;
  const { resposta, setResposta } = useState(0); // -1=errado 0=nãorespondido 1=correto
  const [ativoA, setAtivoA] = useState(false);
  const [ativoB, setAtivoB] = useState(false);
  const [ativoC, setAtivoC] = useState(false);
  const [ativoD, setAtivoD] = useState(false);
  const [actualTime, setActualTime] = useState(0);
  const [checkResposta, setCheckResposta] = useState(0);
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

  function VerAtivo() {
    if (ativoA === true) {
      return 1;
    } else if (ativoB === true) {
      return 2;
    } else if (ativoC === true) {
      return 3;
    } else if (ativoD === true) {
      return 4;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (props.timer) {
        setActualTime((oldtime) => oldtime + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nivel]);

  useEffect(() => {
    if (props.timer) {
      setActualTime(0);
    }
  }, [nivel]);

  return (
    <div>
      {/* DEBUG ================================================================================ */}

      <p>
        {pergunta
          ? "DEBUG: Foi possível carregar as perguntas"
          : "DEBUG: Não foi possível carregar as perguntas"}
      </p>
      {pergunta && <p>gabarito: {Number(pergunta.gabarito) + 1} </p>}
      {pergunta && (
        <p>
          Timer: {props.timer && "ON"} {!props.timer && "OFF"}
        </p>
      )}
      {pergunta && <p>RespostaState: {checkResposta}</p>}
      {pergunta && <p>Remaining time: {60 - actualTime}</p>}

      {/* DEBUG ================================================================================ */}

      <div className="flex justify-center w-full">
        <div className="w-full max-w-xl flex flex-col items-center">
          {pergunta && (
            <div className="flex flex-col my-4 space-y-4 center ">
              <Perguntas pergunta={pergunta.pergunta} nivel={nivel} />
              <Respostas
                texto={pergunta.resposta_0}
                ativar={() => setAtivoA(true)}
                desativar={() => setAtivoA(false)}
                ativo={ativoA}
              />
              <Respostas
                texto={pergunta.resposta_1}
                ativar={() => setAtivoB(true)}
                desativar={() => setAtivoB(false)}
                ativo={ativoB}
              />
              <Respostas
                texto={pergunta.resposta_2}
                ativar={() => setAtivoC(true)}
                desativar={() => setAtivoC(false)}
                ativo={ativoC}
              />
              <Respostas
                texto={pergunta.resposta_3}
                ativar={() => setAtivoD(true)}
                desativar={() => setAtivoD(false)}
                ativo={ativoD}
              />
            </div>
          )}
        </div>

        {/* <ImagemEnunciado /> */}
      </div>

      <LinhaProgresso nivel={nivel} />
      {props.timer && (
        <div className="my-10 center justify-center center-items">
          {actualTime && (
            <video className="w-64 h-40" width autoPlay muted playsInline loop>
              <source src="/videos/clock.mp4" type="video/mp4" />
              Clock_Timer_View ERROR
            </video>
          )}
          <p>Remaining time: {60 - actualTime}</p>
        </div>
      )}
      <div className="flex justify-end gap-4">
        {checkResposta === 0 && (
          <BotaoResponder
            valor={Addlevel}
            gabarito={pergunta && Number(pergunta.gabarito) + 1}
            selecionado={VerAtivo}
            deselectA={() => setAtivoA(false)}
            deselectB={() => setAtivoB(false)}
            deselectC={() => setAtivoC(false)}
            deselectD={() => setAtivoD(false)}
            resposta={resposta}
            setResposta={setResposta}
            checkResposta={checkResposta}
            setCheckResposta={setCheckResposta}
          />
        )}

        {checkResposta === 1 && (
          <BotaoProsseguir
            valor={Addlevel}
            setCheckResposta={setCheckResposta}
          />
        )}

        {checkResposta === -1 && (
          <BotaoReiniciar
            valor={Zerolevel}
            setCheckResposta={setCheckResposta}
          />
        )}

        <BotaoDesistir valor={Zerolevel} />
      </div>
      <NivelSoldador nivel={props.nivel} />

      <EscadaJogo
        link="./src/img/Escada Jogo.png"
        nome="Imagem Escada"
        nivel={nivel}
      />
    </div>
  );
}

export default Game_convidado_P;
