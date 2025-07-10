import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Gametype from "../config convidado/Gametypes";
import Gamemodes from "../config convidado/Gamemodes";
import BotaoDeslizante from "../config convidado/botão deslizante";
import AparecerNoRanking from "./AparecerNoRanking";
function MenuConfigJogoLogado(props) {
  const [timer, setTimer] = useState(true);

  function ModoCompetitivo() {
    if (props.modulo1 == false) {
      props.func1();
    }
    if (props.modulo2 == false) {
      props.func2();
    }
    if (props.modulo3 == false) {
      props.func3();
    }
    if (props.modulo4 == false) {
      props.func4();
    }
    if (timer == false) {
      setTimer(!timer);
    }
  }

  useEffect(() => {
    props.setTimer(timer);
  }, [timer]);

  return (
    <div className="w-[900px] h-[350px] bg-white-500 rounded-xl shadow-lg border space-y-3 !">
      <div className=" gap-4 margin-3">
        <div className="flex">
          <p className="font-serif font bold text-xl text-left ml-5 mt-3">
            Configurações do jogo
          </p>
        </div>

        <div className="flex flex-row">
          <div className="flex mt-5">
            <p className="text-5xl  ml-3">📚</p>
            <div>
              <p className="font-serif text-left">Escolha um ou mais módulos</p>
              <p className=" font-serif text-gray-400">
                (Responda perguntas sobre diferentes aspectos de soldagem)
              </p>
            </div>
            <div>
              {/* ============================================================ APARECER NO RANKING */}
              <button
                onClick={() => {
                  ModoCompetitivo();
                }}
                className={
                  props.modulo1 &&
                  props.modulo2 &&
                  props.modulo3 &&
                  props.modulo4 &&
                  timer
                    ? " bottom-1 left-30 !bg-white mx-20 shadow-lg "
                    : " bottom-1 left-30 !bg-gray-300 mx-20 shadow-lg line-through "
                }
              >
                ◎ Aparecer no Ranking
              </button>
              {/* ============================================================ APARECER NO RANKING */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col space-y-3">
        <div className="flex gap-4 mx-auto my-3">
          <Gametype
            texto={" 1 - Processos ⚙️"}
            define={props.func1}
            ativo={props.modulo1}
          />
          <Gametype
            texto={" 2 - Materiais 🧱"}
            define={props.func2}
            ativo={props.modulo2}
          />
          <Gametype
            texto={" 3 - Projeto ‍🏭"}
            define={props.func3}
            ativo={props.modulo3}
          />
          <Gametype
            texto={" 4 - Fabricação 📐"}
            define={props.func4}
            ativo={props.modulo4}
          />
        </div>
        <div className="flex gap-5 mx-auto my-5 ">
          <div className="flex items-center flex-col justify-center">
            <div className="flex flex-col items-center">
              <div className="w-[250px] h-[90px] flex gap-3 ">
                <p className="text-2xl"> ⌛ </p>
                <p>Temporizador</p>
              </div>
              <BotaoDeslizante
                timer={timer}
                setTimer={setTimer}
                parameter={timer}
              />
            </div>
          </div>
          <Gamemodes
            timer={timer}
            setTimer={setTimer}
            parameter={timer}
            texto={" Modo cronometrado"}
            legenda={"Responda cada pergunta em até 60 segundos"}
          />

          <Gamemodes
            timer={timer}
            setTimer={setTimer}
            parameter={!timer}
            texto={" Modo livre"}
            legenda={"Sem tempo limite para jogar"}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuConfigJogoLogado;
