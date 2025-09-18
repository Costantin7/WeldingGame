import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import LoginUsuario from "./LoginUsuario";
import RecuperarSenha from "./RecuperarSenha";
import Resgistrar from "./Registrar";
function BotaoLogin(props) {
  const [ativo, setAtivo] = useState(0);

  return (
    <div className="text-right">
      <div className=" absolute top-[15.5%] right-[2.9%] flex-col items-center z-500">
        <button
          onClick={() => setAtivo(1)}
          className="!bg-blue-600 !text-white  !px-[5%] sm:!px-[10%] md:!px-[25%] lg:!px-[30%]  !py-[4%] !rounded-md"
        >
          <p className="font-bold font-serif text-[clamp(0.3rem,2vw,1rem)]">
            Login
          </p>
        </button>

        {ativo == 1 && (
          <LoginUsuario setUsername={props.setUsername} desativar={setAtivo} />
        )}
        {ativo == 2 && <RecuperarSenha desativar={setAtivo} />}
        {ativo == 3 && <Resgistrar desativar={setAtivo} />}
        <Link to="/config_logado"></Link>
        {/*========================================================= URL  */}

        <Link to="/config_convidado">
          <p className=" font-serif underline text-black underline-offset-4 text-[clamp(0.3rem,1.5vw,1rem)]">
            {" "}
            Jogar como convidado{" "}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default BotaoLogin;
