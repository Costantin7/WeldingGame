import Perguntas from "../components/game convidado/Perguntas";
import Respostas from "../components/game convidado/Respostas";
import LinhaProgresso from "../components/game convidado/Linha progresso";
import BotaoResponder from "../components/game convidado/BotaoResponder";
import BotaoDesistir from "../components/game convidado/BotaoDesistir";
import EscadaJogo from "../components/game convidado/Escada Jogo";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BotaoProsseguir from "../components/game convidado/BotaoProsseguir";
import BotaoReiniciar from "../components/game convidado/BotaoReiniciar";
import TelaErro from "../components/game convidado/Tela_Erro";
import TelaVitoria from "../components/game convidado/Tela_Vitoria";

function Game_convidado_P(props) {
  // --- ESTADOS (sem alterações) ---
  const { nivel, Addlevel, Zerolevel, username } = props;
  const idioma = props.idiomaprop;
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(null);
  const [carregandoJogo, setCarregandoJogo] = useState(true);
  const [gameError, setGameError] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [imagem, setImagem] = useState(null);
  const [resposta, setResposta] = useState(0);
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
  const [winscreen, setWinscreen] = useState(true);

  // --- LÓGICA DE BUSCA INICIAL DAS PERGUNTAS ---
  useEffect(() => {
    async function fetchJogoCompleto() {
      setCarregandoJogo(true);
      setGameError(null);
      setPerguntas([]);
      setExplanation("");
      setImagem(null);

      // CORREÇÃO DO BUG DO CRONÔMETRO: Resetar o tempo aqui garante que todo novo jogo comece com o relógio zerado.
      setActualTime(0);

      const temasIncluidos = [];
      if (props.modulo1) temasIncluidos.push(0);
      if (props.modulo2) temasIncluidos.push(1);
      if (props.modulo3) temasIncluidos.push(2);
      if (props.modulo4) temasIncluidos.push(3);

      if (temasIncluidos.length === 0) {
        setGameError("Por favor, selecione pelo menos um módulo para começar.");
        setCarregandoJogo(false);
        return;
      }

      const params = {
        idioma: idioma.toString(),
        temas: temasIncluidos.join(","),
      };

      try {
        const response = await axios.get(
          "http://localhost:8000/game/perguntas/",
          { params }
        );
        if (response.data && response.data.length === 20) {
          setPerguntas(response.data);
        } else {
          setGameError(
            "Não foi possível carregar o conjunto completo de perguntas. Tente outros módulos."
          );
        }
      } catch (error) {
        console.error(
          "Ocorreu um erro ao buscar o conjunto de perguntas.",
          error
        );
        const errorMsg =
          error.response?.data?.mensagem ||
          "Erro de comunicação com o servidor.";
        setGameError(`Não foi possível iniciar o jogo: ${errorMsg}`);
      } finally {
        setCarregandoJogo(false);
      }
    }

    fetchJogoCompleto();
  }, [
    idioma,
    props.modulo1,
    props.modulo2,
    props.modulo3,
    props.modulo4,
    forceRefetch,
  ]);

  // --- ATUALIZA A PERGUNTA ATUAL QUANDO O NÍVEL MUDA (sem alterações) ---
  useEffect(() => {
    if (perguntas.length > 0 && nivel > 0 && nivel <= perguntas.length) {
      const novaPergunta = perguntas[nivel - 1];
      setPerguntaAtual(novaPergunta);

      setExplanation(novaPergunta.explanation || "");
      setImagem(novaPergunta.ilustracao || null);

      setAtivoA(false);
      setAtivoB(false);
      setAtivoC(false);
      setAtivoD(false);
    }
  }, [nivel, perguntas]);

  // --- LÓGICA DE ENVIO DE RESULTADO (sem alterações) ---
  useEffect(() => {
    const enviarResultadoFinal = async (vitoria) => {
      if (resultadoEnviado) return;
      const modulosSelecionados = [
        "Processos",
        "Materiais",
        "Projeto",
        "Fabricação",
      ].filter((_, i) => props[`modulo${i + 1}`]);
      const dadosDaPartida = {
        nickname: username || "Convidado",
        pais: "BR",
        tempo: tempoGastoTotal,
        nivel_max: vitoria ? 20 : nivel > 1 ? nivel - 1 : 0,
        modulos: modulosSelecionados.join(", "),
      };
      try {
        const authToken = localStorage.getItem("authToken");
        const headers = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};
        await axios.post(
          "http://localhost:8000/leaderboard/salvar/",
          dadosDaPartida,
          { headers }
        );
        setResultadoEnviado(true);
      } catch (error) {
        console.error(
          "Falha ao salvar placar:",
          error.response?.data || error.message
        );
      }
    };
    if ((checkResposta === 1 && nivel === 20) || telainfo === true) {
      enviarResultadoFinal(checkResposta === 1 && nivel === 20);
    }
  }, [
    checkResposta,
    nivel,
    telainfo,
    resultadoEnviado,
    tempoGastoTotal,
    props,
    username,
  ]);

  // --- Outros useEffects (sem alterações) ---
  useEffect(() => {
    if (nivel === 1) {
      setResultadoEnviado(false);
      setTempoGastoTotal(0);
    }
  }, [nivel]);
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
        setActualTime((t) => t + 1);
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
      setTempoGastoTotal((t) => t + actualTime);
    }
  }, [checkResposta, actualTime]);

  // --- RENDERIZAÇÃO ---
  const renderConteudoPrincipal = () => {
    if (carregandoJogo) {
      return (
        <div className="flex-1 text-center">
          {" "}
          <p>A preparar o seu jogo...</p>{" "}
        </div>
      );
    }
    if (gameError) {
      return (
        <div className="flex-1 text-center text-red-600">
          {" "}
          <p>{gameError}</p>{" "}
        </div>
      );
    }
    if (perguntaAtual) {
      return (
        <div className="flex flex-col flex-1 px-4">
          {/* O bloco de imagem que estava aqui foi REMOVIDO para corrigir o bug de posicionamento. */}
          <Perguntas pergunta={perguntaAtual.pergunta} nivel={nivel} />
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
            <Respostas
              texto={perguntaAtual.resposta_0}
              ativar={() => setAtivoA(true)}
              desativar={() => setAtivoA(false)}
              ativo={ativoA}
              gabarito={Number(perguntaAtual.gabarito) + 1}
              modo={checkResposta}
              gabaritoDesse={1}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
            />
            <Respostas
              texto={perguntaAtual.resposta_1}
              ativar={() => setAtivoB(true)}
              desativar={() => setAtivoB(false)}
              ativo={ativoB}
              gabarito={Number(perguntaAtual.gabarito) + 1}
              modo={checkResposta}
              gabaritoDesse={2}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
            />
            <Respostas
              texto={perguntaAtual.resposta_2}
              ativar={() => setAtivoC(true)}
              desativar={() => setAtivoC(false)}
              ativo={ativoC}
              gabarito={Number(perguntaAtual.gabarito) + 1}
              modo={checkResposta}
              gabaritoDesse={3}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
            />
            <Respostas
              texto={perguntaAtual.resposta_3}
              ativar={() => setAtivoD(true)}
              desativar={() => setAtivoD(false)}
              ativo={ativoD}
              gabarito={Number(perguntaAtual.gabarito) + 1}
              modo={checkResposta}
              gabaritoDesse={4}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
            />
          </div>
          {/* <p>gabarito:{Number(perguntaAtual.gabarito) + 1}</p>
          <p>modulo 1:{Number(props.modulo1)}</p>
          <p>modulo 2:{Number(props.modulo2)}</p>
          <p>modulo 3:{Number(props.modulo3)}</p>
          <p>modulo 4:{Number(props.modulo4)}</p>
          <p>explicação: {explanation}</p>
          <p>imagem: {imagem}</p> */}
        </div>
      );
    }
    return (
      <div className="flex-1 text-center">
        {" "}
        <p>A carregar pergunta...</p>{" "}
      </div>
    );
  };

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
                    {" "}
                    Tempo restante: {60 - actualTime} segundos{" "}
                  </p>
                )}
                {checkResposta === 1 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    {" "}
                    Tempo gasto: {tempoGasto} segundos{" "}
                  </p>
                )}
                {actualTime >= 60 && checkResposta !== 1 && (
                  <p className="mt-2 text-center text-lg font-medium">
                    {" "}
                    Tempo esgotado!{" "}
                  </p>
                )}
              </div>
            )}
          </div>

          {renderConteudoPrincipal()}

          <div className="flex flex-col items-center justify-center w-72 mx-4">
            {/* CORREÇÃO DO BUG DA IMAGEM: A lógica agora está aqui. */}
            <img
              className={
                imagem && imagem != "nan"
                  ? " object-cover rounded-lg"
                  : "w-85 h-25 object-cover rounded-lg"
              }
              // Se 'imagem' existir, monta o caminho dela, senão, usa o logo padrão.
              src={
                imagem && imagem != "nan"
                  ? `./src/img/img_game/${imagem}.jpg`
                  : "./src/img/Logo laprosolda completa.jpg"
              }
              alt={imagem ? "Ilustração da pergunta" : "Imagem de soldadura"}
            />
            <div className="flex mx-2">
              {checkResposta === 0 && !gameError && (
                <BotaoResponder
                  valor={Addlevel}
                  gabarito={perguntaAtual && Number(perguntaAtual.gabarito) + 1}
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

      {telainfo && perguntaAtual && (
        <TelaErro
          desativar={setTelainfo}
          actualTime={actualTime}
          nivel={nivel}
          gabarito={Number(perguntaAtual.gabarito) + 1}
          gabaritoA={perguntaAtual.resposta_0}
          gabaritoB={perguntaAtual.resposta_1}
          gabaritoC={perguntaAtual.resposta_2}
          gabaritoD={perguntaAtual.resposta_3}
          explanation={explanation}
          valor={Zerolevel}
          setCheckResposta={setCheckResposta}
          setTempoGastoTotal={setTempoGastoTotal}
          refetchPergunta={() => setForceRefetch((prev) => prev + 1)}
        />
      )}
      {checkResposta === 1 && nivel === 20 && winscreen == true && (
        <TelaVitoria desativar={setWinscreen} />
      )}
    </div>
  );
}

export default Game_convidado_P;
