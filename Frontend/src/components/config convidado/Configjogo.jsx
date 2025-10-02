import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Gametype from "./Gametypes";
import Gamemodes from "./Gamemodes";
import BotaoDeslizante from "./botão deslizante";
import { getText } from "../../ftexto";

function Configjogo(props) {
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    props.setTimer(timer);
  }, [timer]);

  return (
    <div className="w-[900px] h-[350px] bg-white-500 rounded-xl shadow-lg border space-y-3 !">
      <div className=" gap-4 margin-3">
        <p className="font-serif font bold text-xl text-left ml-5 mt-3">
          {getText({
            lang: props.lang,
            endereco: "Configjogologado.configuracoesDoJogo",
          })}
        </p>

        <div className="flex mt-5">
          <p className="text-5xl  ml-3">📚</p>
          <div>
            <p className="font-serif text-left">
              {" "}
              {getText({
                lang: props.lang,
                endereco: "Configjogologado.escolhaUmOuMaisModulos",
              })}
            </p>
            <p className=" font-serif text-gray-400">
              {getText({
                lang: props.lang,
                endereco: "Configjogologado.respondaPerguntas",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col space-y-3">
        <div className="flex gap-4 mx-auto my-3">
          <Gametype
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.processos",
            })}
            define={props.func1}
            ativo={props.modulo1}
          />
          <Gametype
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.materiais",
            })}
            define={props.func2}
            ativo={props.modulo2}
          />
          <Gametype
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.projeto",
            })}
            define={props.func3}
            ativo={props.modulo3}
          />
          <Gametype
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.fabricacao",
            })}
            define={props.func4}
            ativo={props.modulo4}
          />
        </div>
        <div className="flex gap-5 mx-auto my-5 ">
          <div className="flex items-center flex-col justify-center">
            <div className="flex flex-col items-center">
              <div className="w-[250px] h-[90px] flex gap-3 ">
                <p className="text-2xl"> ⌛ </p>
                <p>
                  {getText({
                    lang: props.lang,
                    endereco: "Configjogologado.temporizador",
                  })}{" "}
                  (60 s)
                </p>
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
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.modoCronometrado",
            })}
            legenda={getText({
              lang: props.lang,
              endereco: "Configjogologado.respondaCadaPergunta",
            })}
          />

          <Gamemodes
            timer={timer}
            setTimer={setTimer}
            parameter={!timer}
            texto={getText({
              lang: props.lang,
              endereco: "Configjogologado.modoLivre",
            })}
            legenda={getText({
              lang: props.lang,
              endereco: "Configjogologado.semTempoLimite",
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Configjogo;
