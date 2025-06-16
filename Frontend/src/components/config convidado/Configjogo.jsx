import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Gametype from "./Gametypes";
import Gamemodes from "./Gamemodes";


function Configjogo(props){    
  return(
    <div className="w-[900px] h-[350px] bg-white-500 rounded-xl shadow-lg border space-y-3 !">

      <div className=" gap-4 margin-3">

        <p className="font-serif font bold text-xl text-left ml-5 mt-3">Configurações do jogo</p>

        <div className="flex mt-5">
          <p className="text-5xl  ml-3">📚</p>
          <div>
            <p className="font-serif text-left">Escolha um ou mais módulos</p>
            <p className=" font-serif text-gray-400">(Responda perguntas sobre diferentes aspectos de soldagem)</p>
          </div>
        </div>

      </div>


      <div className="flex items-center flex-col space-y-3">

      <div className="flex gap-4 mx-auto my-3">
      <Gametype texto={" 1 - Processos ⚙️"} define={props.func1} />
      <Gametype texto={" 2 - Materiais 🧱"} define={props.func2} />
      <Gametype texto={" 3 - Projeto ‍🏭"} define={props.func3}/>
      <Gametype texto={" 4 - Fabricação 📐"} define={props.func4}/>
      </div>  
      <div className="flex gap-5 mx-auto my-5">

      <div className="w-[250px] h-[90px] flex gap-3">
      <p className="text-2xl"> ⌛ </p>
      <p >Temporizador</p>
      </div>
            
      <Gamemodes 
      texto={" Modo cronometrado"} 
      legenda={"Responda cada pergunta em até 60 segundos"}
      />

      <Gamemodes 
      texto={" Modo livre"}
      legenda={"Sem tempo limite para jogar"}
      />

      </div>
      </div>  
    </div>
  )
}

export default Configjogo;