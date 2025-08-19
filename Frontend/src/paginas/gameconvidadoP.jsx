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
  const { nivel, Addlevel, Zerolevel, username } = props; // Adicionado username
  const idioma = props.idiomaprop;
  const [resposta, setResposta] = useState(0); // -1=errado 0=não respondido 1=correto
  const [ativoA, setAtivoA] = useState(false);
  const [ativoB, setAtivoB] = useState(false);
  const [ativoC, setAtivoC] = useState(false);
  const [ativoD, setAtivoD] = useState(false);
  const [actualTime, setActualTime] = useState(0);
  const [checkResposta, setCheckResposta] = useState(0);
  const [telainfo, setTelainfo] = useState(false);
  const [selecionado, setSelecionado] = useState(0);
  const [tempoGasto, setTempoGasto] = useState(0);
  const [tempoGastoTotal, setTempoGastoTotal] = useState(0);
  const videoRef = useRef(null);
  const [forceRefetch, setForceRefetch] = useState(0);
  const [resultadoEnviado, setResultadoEnviado] = useState(false);

  // --- LÓGICA DE ENVIO DE RESULTADO ---
  useEffect(() => {
    const enviarResultadoFinal = async (vitoria) => {
      if (resultadoEnviado) return;

      const modulosSelecionados = [];
      if (props.modulo1) modulosSelecionados.push("Processos");
      if (props.modulo2) modulosSelecionados.push("Materiais");
      if (props.modulo3) modulosSelecionados.push("Projeto");
      if (props.modulo4) modulosSelecionados.push("Fabricação");

      const dadosDaPartida = {
        nickname: username || "Convidado",
        pais: "BR", // Fixo para convidados
        tempo: tempoGastoTotal,
        nivel_max: vitoria ? 20 : nivel,
        modulos: modulosSelecionados.join(", "),
      };

      try {
        await axios.post(
          "http://localhost:8000/leaderboard/salvar/",
          dadosDaPartida
        );
        console.log(
          "Resultado da partida (convidado) enviado com sucesso!",
          dadosDaPartida
        );
        setResultadoEnviado(true);
      } catch (error) {
        console.error(
          "Tentativa de salvar placar de convidado falhou (esperado):",
          error.response?.data || error.message
        );
      }
    };

    if ((checkResposta === 1 && nivel === 20) || telainfo === true) {
      const vitoria = checkResposta === 1 && nivel === 20;
      enviarResultadoFinal(vitoria);
    }
  }, [checkResposta, nivel, telainfo, resultadoEnviado]);

  // Reseta o estado de envio quando o jogo reinicia
  useEffect(() => {
    if (nivel === 1) {
      setResultadoEnviado(false);
    }
  }, [nivel]);

  // --- LÓGICA DO JOGO ---
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (checkResposta === 0) {
      video.pause();
      video.currentTime = 0;
      video.play();
    } else if (checkResposta === -1 || checkResposta === 1) {
      video.pause();
    }
  }, [checkResposta]);

  useEffect(() => {
    if (ativoA) {
      setAtivoB(false);
      setAtivoC(false);
      setAtivoD(false);
    }
  }, [ativoA]);

  useEffect(() => {
    if (ativoB) {
      setAtivoA(false);
      setAtivoC(false);
      setAtivoD(false);
    }
  }, [ativoB]);

  useEffect(() => {
    if (ativoC) {
      setAtivoA(false);
      setAtivoB(false);
      setAtivoD(false);
    }
  }, [ativoC]);

  useEffect(() => {
    if (ativoD) {
      setAtivoA(false);
      setAtivoB(false);
      setAtivoC(false);
    }
  }, [ativoD]);

  useEffect(() => {
    async function fetchPergunta() {
      const temasIncluidos = [];
      if (props.modulo1) temasIncluidos.push(1);
      if (props.modulo2) temasIncluidos.push(2);
      if (props.modulo3) temasIncluidos.push(3);
      if (props.modulo4) temasIncluidos.push(4);

      if (temasIncluidos.length === 0) {
        console.log(
          "Nenhum módulo selecionado. A busca de perguntas foi interrompida."
        );
        setPergunta(null);
        return;
      }

      const params = {
        idioma: idioma.toString(),
        nivel: nivel.toString(),
        temas: temasIncluidos.join(","),
      };

      try {
        console.log(
          "A tentar buscar pergunta com os seguintes parâmetros:",
          params
        );

        // CORREÇÃO: Adicionado o prefixo 'game/' à URL
        const response = await axios.get(
          "http://localhost:8000/game/perguntas/",
          { params }
        );

        console.log("Pergunta recebida com sucesso:", response.data);
        setPergunta(response.data);
      } catch (error) {
        console.error(
          "Ocorreu um erro ao buscar a pergunta. Verifique o terminal do backend para mais detalhes."
        );
        if (error.response) {
          console.error("Dados do erro:", error.response.data);
          console.error("Status do erro:", error.response.status);
        } else if (error.request) {
          console.error(
            "Nenhuma resposta recebida. O servidor backend está online e o CORS está configurado corretamente?",
            error.request
          );
        } else {
          console.error("Erro na configuração do pedido:", error.message);
        }
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
    forceRefetch,
  ]);

  function VerAtivo() {
    if (ativoA) return 1;
    if (ativoB) return 2;
    if (ativoC) return 3;
    if (ativoD) return 4;
    return 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (props.timer && checkResposta === 0) {
        setActualTime((oldtime) => oldtime + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [props.timer, checkResposta]);

  useEffect(() => {
    if (props.timer) {
      setActualTime(0);
    }
  }, [nivel]);

  useEffect(() => {
    if (actualTime >= 60 && checkResposta === 0) {
      setTelainfo(true);
      setCheckResposta(-1);
    }
  }, [actualTime, checkResposta]);

  useEffect(() => {
    if (checkResposta === 1) {
      setTempoGasto(actualTime);
      setTempoGastoTotal((prevTotal) => prevTotal + actualTime);
    }
  }, [checkResposta]);

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="fixed top-3 w-full max-w-screen-xl !bg-white rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-row justify-between items-center min-w-[80vw] z-20">
          <div className="flex justify-center flex-col items-center">
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
                {actualTime >= 60 && checkResposta !== 1 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    Tempo esgotado!
                  </p>
                )}
              </div>
            )}
          </div>

          {pergunta ? (
            <div className="flex flex-col flex-1 px-4">
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
          ) : (
            <div className="flex-1 text-center">
              <p>A carregar pergunta...</p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center w-72 mx-4">
            <img
              className="w-72 h-48 object-cover rounded-lg"
              src="https://www.fvmt.com/hubfs/Images/Blog%20Images/Aluminum%20vs%20Stainless%20Steel%20Welding.jpg"
              alt="Imagem de soldadura"
            />
            <div className="flex mx-2">
              {checkResposta === 0 && (
                <BotaoResponder
                  valor={Addlevel}
                  gabarito={pergunta && Number(pergunta.gabarito) + 1}
                  selecionado={VerAtivo}
                  setCheckResposta={setCheckResposta}
                  setTelainfo={setTelainfo}
                />
              )}
              {checkResposta === 1 && nivel < 20 && (
                <BotaoProsseguir
                  valor={Addlevel}
                  setCheckResposta={setCheckResposta}
                />
              )}
              {checkResposta === -1 && (
                <BotaoReiniciar
                  valor={Zerolevel}
                  setCheckResposta={setCheckResposta}
                  setTempoGastoTotal={setTempoGastoTotal}
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
      {telainfo && <TelaErro desativar={setTelainfo} actualTime={actualTime} />}
      {checkResposta === 1 && nivel === 20 && (
        <TelaVitoria desativar={setCheckResposta} />
      )}
    </div>
  );
}

export default Game_convidado_P;
