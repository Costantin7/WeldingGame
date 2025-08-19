import Perguntas from "../components/game convidado/Perguntas";
import Respostas from "../components/game convidado/Respostas";
import LinhaProgresso from "../components/game convidado/Linha progresso";
import BotaoResponder from "../components/game convidado/BotaoResponder";
import BotaoDesistir from "../components/game convidado/BotaoDesistir";
import EscadaJogo from "../components/game convidado/Escada Jogo";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import NivelSoldador from "../components/game convidado/NivelSoldador";
import BotaoProsseguir from "../components/game convidado/BotaoProsseguir";
import BotaoReiniciar from "../components/game convidado/BotaoReiniciar";
import TelaErro from "../components/game convidado/Tela_Erro";
import TelaVitoria from "../components/game convidado/Tela_Vitoria";

function Game_convidado_P(props) {
  const [pergunta, setPergunta] = useState(null);
  const { nivel, Addlevel, Zerolevel } = props;
  const idioma = props.idiomaprop;
  const [resposta, setResposta] = useState(0); // -1=errado 0=não respondido 1=correto
  const [ativoA, setAtivoA] = useState(false);
  const [ativoB, setAtivoB] = useState(false);
  const [ativoC, setAtivoC] = useState(false);
  const [ativoD, setAtivoD] = useState(false);
  const [actualTime, setActualTime] = useState(0);
  const [checkResposta, setCheckResposta] = useState(0);
  const [telainfo, setTelainfo] = useState(false);
  const [selecionado, setSelecionado] = useState(0); //REFERENTE a seleção de perguntas
  const [tempoGasto, setTempoGasto] = useState(0); //por pergunta
  const [tempoGastoTotal, setTempoGastoTotal] = useState(0); //somatório
  const videoRef = useRef(null);
  // NOVO ESTADO PARA FORÇAR A ATUALIZAÇÃO DA PERGUNTA
  const [forceRefetch, setForceRefetch] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (checkResposta === 0) {
      video.pause(); // Pausa para garantir reset limpo
      video.currentTime = 0; // Reinicia o vídeo
      video.play(); // Dá play novamente
    } else if (checkResposta === -1 || checkResposta === 1) {
      video.pause(); // Pausa o vídeo
    }
  }, [checkResposta]);

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

  useEffect(() => {
    async function fetchPergunta() {
      const temasIncluidos = [];
      if (props.modulo1) temasIncluidos.push(1);
      if (props.modulo2) temasIncluidos.push(2);
      if (props.modulo3) temasIncluidos.push(3);
      if (props.modulo4) temasIncluidos.push(4);

      if (temasIncluidos.length === 0) {
        setPergunta(null);
        console.error("Nenhum módulo selecionado.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/perguntas/", {
          params: {
            idioma: idioma.toString(),
            nivel: nivel.toString(),
            temas: temasIncluidos.join(","),
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
    props.modulo1,
    props.modulo2,
    props.modulo3,
    props.modulo4,
    forceRefetch, // ADICIONADO O NOVO ESTADO ÀS DEPENDÊNCIAS
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
        if (checkResposta == 0) {
          setActualTime((oldtime) => oldtime + 1);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nivel]);

  useEffect(() => {
    if (props.timer) {
      setActualTime(0);
    }
  }, [nivel]);

  useEffect(() => {
    if (actualTime >= 60 && checkResposta == 0) {
      setAtivoC(false);
      setAtivoD(false);
      setAtivoA(false);
      setAtivoB(false);
      setTelainfo(true);
      setCheckResposta(-1);
    }
  }, [actualTime]);

  useEffect(() => {
    if (props.timer && checkResposta === 0) {
      setActualTime(0);
    }
  }, [checkResposta]);

  useEffect(() => {
    if (checkResposta === 1) {
      setTempoGasto(actualTime);
      setTempoGastoTotal(tempoGastoTotal + actualTime);
    }
  }, [checkResposta]);

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="fixed top-3  w-full max-w-screen-xl !bg-white rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-row justify-between items-center min-w-[80vw] z-20">
          <div className=" flex justify-center flex-col items-center">
            {props.timer && (
              <div className="flex flex-col items-center justify-center w-72">
                <video
                  ref={videoRef}
                  className="w-72 h-48"
                  muted
                  playsInline
                  loop={false}
                >
                  <source src="/videos/clock.mp4" type="video/mp4" />
                  Clock_Timer_View ERROR
                </video>
                {actualTime < 60 && checkResposta === 0 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    Tempo restante: {60 - actualTime} segundos
                  </p>
                )}
                {checkResposta === 1 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    Tempo gasto: {tempoGasto} segundos
                  </p>
                )}
                {actualTime >= 60 && checkResposta != 1 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    Tempo esgotado!
                  </p>
                )}
              </div>
            )}
          </div>

          {pergunta && (
            <div className="flex flex-col flex-1 px-4 ">
              <Perguntas pergunta={pergunta.pergunta} nivel={nivel} />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <Respostas
                  texto={pergunta.resposta_0}
                  ativar={() => setAtivoA(true)}
                  desativar={() => setAtivoA(false)}
                  ativo={ativoA}
                  gabarito={Number(pergunta.gabarito) + 1}
                  modo={checkResposta}
                  gabaritoDesse={1}
                  selecionado={selecionado}
                  setSelecionado={setSelecionado}
                />
                <Respostas
                  texto={pergunta.resposta_1}
                  ativar={() => setAtivoB(true)}
                  desativar={() => setAtivoB(false)}
                  ativo={ativoB}
                  gabarito={Number(pergunta.gabarito) + 1}
                  modo={checkResposta}
                  gabaritoDesse={2}
                  selecionado={selecionado}
                  setSelecionado={setSelecionado}
                />
                <Respostas
                  texto={pergunta.resposta_2}
                  ativar={() => setAtivoC(true)}
                  desativar={() => setAtivoC(false)}
                  ativo={ativoC}
                  gabarito={Number(pergunta.gabarito) + 1}
                  modo={checkResposta}
                  gabaritoDesse={3}
                  selecionado={selecionado}
                  setSelecionado={setSelecionado}
                />
                <Respostas
                  texto={pergunta.resposta_3}
                  ativar={() => setAtivoD(true)}
                  desativar={() => setAtivoD(false)}
                  ativo={ativoD}
                  gabarito={Number(pergunta.gabarito) + 1}
                  modo={checkResposta}
                  gabaritoDesse={4}
                  selecionado={selecionado}
                  setSelecionado={setSelecionado}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col  items-center justify-center w-72 mx-4">
            <img
              className="w-72 h-48 object-cover rounded-lg"
              src="https://www.fvmt.com/hubfs/Images/Blog%20Images/Aluminum%20vs%20Stainless%20Steel%20Welding.jpg"
              alt="Imagem não renderizada"
            />
            <div className="flex mx-2">
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
                  setTelainfo={setTelainfo}
                />
              )}

              {checkResposta === 1 && nivel != 20 && (
                <BotaoProsseguir
                  valor={Addlevel}
                  setCheckResposta={setCheckResposta}
                />
              )}

              {checkResposta === -1 && (
                <BotaoReiniciar
                  valor={Zerolevel}
                  valor2={Addlevel}
                  setCheckResposta={setCheckResposta}
                  setTempoGastoTotal={setTempoGastoTotal}
                  // PROP ADICIONADA PARA CHAMAR A FUNÇÃO DE ATUALIZAÇÃO
                  refetchPergunta={() => setForceRefetch((prev) => prev + 1)}
                />
              )}
              <BotaoDesistir valor={Zerolevel} />
            </div>
          </div>
        </div>
      </div>
      <EscadaJogo
        link="./src/img/Escada Jogo.png"
        nome="Imagem Escada"
        nivel={nivel}
        timer={props.timer}
        actualTime={actualTime}
      />
      {telainfo === true && (
        <TelaErro desativar={setTelainfo} actualTime={actualTime} />
      )}
      {checkResposta === 1 && nivel === 20 && (
        <TelaVitoria desativar={setCheckResposta} />
      )}
    </div>
  );
}

export default Game_convidado_P;
