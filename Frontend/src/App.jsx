import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home_P from "./paginas/homeP";
import Convidado_P from "./paginas/configconvidadoP";
import Logado_P from "./paginas/configlogadoP";
import Game_convidado_P from "./paginas/gameconvidadoP";
import Game_logado_P from "./paginas/gamelogadoP";
import { useState } from "react";

//testando git :)

//levar ao endereço
// <Link to="/">Início</Link>
//criar endereço
//<Route path="/" element={<Home />} />

/*  TESTE VISUAL DEV


          <div style={{
      width: "150px",
      height: "150px",
      backgroundColor:
      modulo4 ? "#f44336" : // vermelho se modulo4 true
      modulo3 ? "#2196f3" : // azul se modulo3 true
      modulo2 ? "#ffeb3b" : // amarelo se modulo2 true
      modulo1 ? "#4caf50" : // verde se modulo1 true
      "#fff",               // branco se nenhum true
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid #ccc",
      fontWeight: "bold",
      fontSize: "18px",
      color: modulo1 || modulo2 || modulo3 || modulo4 ? "#000" : "#666"
      }}>
      { [modulo1, modulo2, modulo3, modulo4].filter(Boolean).length } ativo{ [modulo1, modulo2, modulo3, modulo4].filter(Boolean).length !== 1 ? "s" : "" }
    </div>
*/

function App() {
  //states globais para comunicação com backend
  const [modulo1, setModulo1] = useState(false); // Processos
  const [modulo2, setModulo2] = useState(false); // Materiais
  const [modulo3, setModulo3] = useState(false); // Projeto
  const [modulo4, setModulo4] = useState(false); // Fabricação
  const [idioma, setIdioma] = useState(0); //idioma 0==pt/br 1==en
  const [nivel, setNivel] = useState(1); //nivel do jogo
  const [timer, setTimer] = useState(false);
  const [username, setUsername] = useState("");
  // const [competitive, setCompetitive] = useState(false);
  function startgame() {
    //prop:startgameprop={startgame}  invocador:useEffect(() => {props.startgameprop();}, []);
    setNivel(1);
  }

  function resetmodule() {
    //prop:resetmoduleprop={resetmodule}  invocador:useEffect(() => {props.resetmoduleprop();}, []);
    setModulo1(false);
    setModulo2(false);
    setModulo3(false);
    setModulo4(false);
  }

  function setIdiomaUp() {
    setIdioma(idioma + 1);
  }

  function setIdiomaDown() {
    setIdioma(idioma - 1);
  }

  return (
    <div>
      {/*Visualizar states ==============================================================================*/}
      {/* <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: modulo4
            ? "#f44336" // vermelho se modulo4 true
            : modulo3
            ? "#2196f3" // azul se modulo3 true
            : modulo2
            ? "#ffeb3b" // amarelo se modulo2 true
            : modulo1
            ? "#4caf50" // verde se modulo1 true
            : "#fff", // branco se nenhum true
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          fontWeight: "bold",
          fontSize: "18px",
          color: modulo1 || modulo2 || modulo3 || modulo4 ? "#000" : "#666",
        }}
      >
        <div className="flex flex-col">
          <p>DEBUG</p>
          <p>
            {[modulo1, modulo2, modulo3, modulo4].filter(Boolean).length} ativo
            {[modulo1, modulo2, modulo3, modulo4].filter(Boolean).length !== 1
              ? "s"
              : ""}
          </p>
          <p> Nivel: {nivel} </p>
          <p> Idioma: {idioma} </p>
          <p>
            {" "}
            Timer : {timer && "ON"} {!timer && "OFF"}
          </p>
        </div>
      </div>{" "} */}
      {/*Visualizar states ==============================================================================*/}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              //ROTA PAGINA HOME
              <Home_P
                idiomaprop={idioma}
                setIdiomaDownprop={setIdiomaDown}
                setIdiomaUpprop={setIdiomaUp}
                setIdioma={setIdioma}
                startgameprop={startgame}
                setUsername={setUsername()}
                username={username}
              />
            }
          />

          <Route
            path="/config_convidado"
            element={
              //ROTA PAGINA CONFIGURAÇÃO DE JOGABILIDADE PARA CONVIDADOS
              <Convidado_P
                idiomaprop={idioma}
                setIdiomaDownprop={setIdiomaDown}
                setIdiomaUpprop={setIdiomaUp}
                funcao1={() => setModulo1(!modulo1)}
                funcao2={() => setModulo2(!modulo2)}
                funcao3={() => setModulo3(!modulo3)}
                funcao4={() => setModulo4(!modulo4)}
                modulo1={modulo1}
                modulo2={modulo2}
                modulo3={modulo3}
                modulo4={modulo4}
                resetmoduleprop={resetmodule}
                startgameprop={startgame}
                setIdioma={setIdioma}
                setTimer={setTimer}
                nivel={nivel}
                setNivel={setNivel}
              />
            }
          />

          {/* <Route
            path="/teste"
            element={
              <Game_teste_P
                startgameprop={startgame}
                Addlevel={() => setNivel(nivel + 1)}
                nivel={nivel}
                idiomaprop={idioma}
                modulo1={modulo1}
                modulo2={modulo2}
                modulo3={modulo3}
                modulo4={modulo4}
              />
            }
          /> */}

          <Route
            path="/config_logado"
            element={
              //ROTA PAGINA CONFIGURAÇÃO DE JOGABILIDADE PARA LOGADOS
              <Logado_P
                idiomaprop={idioma}
                setIdiomaDownprop={setIdiomaDown}
                setIdiomaUpprop={setIdiomaUp}
                funcao1={() => setModulo1(!modulo1)}
                funcao2={() => setModulo2(!modulo2)}
                funcao3={() => setModulo3(!modulo3)}
                funcao4={() => setModulo4(!modulo4)}
                modulo1={modulo1}
                modulo2={modulo2}
                modulo3={modulo3}
                modulo4={modulo4}
                resetmoduleprop={resetmodule}
                startgameprop={startgame}
                setIdioma={setIdioma}
                setTimer={setTimer}
              />
            }
          />

          <Route
            path="/welding_game_convidado"
            element={
              //ROTA PAGINA JOGO PARA CONVIDADOS
              <Game_convidado_P
                startgameprop={startgame}
                Addlevel={() => setNivel(nivel + 1)}
                Zerolevel={() => setNivel(1)}
                nivel={nivel}
                idiomaprop={idioma}
                modulo1={modulo1}
                modulo2={modulo2}
                modulo3={modulo3}
                modulo4={modulo4}
                timer={timer}
                setNivel={setNivel}
              />
            }
          />

          <Route
            path="/welding_game"
            element={
              //ROTA PAGINA JOGO PARA LOGADOS
              <Game_logado_P />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
