import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function BotaoLogin(){
    return(
        <div className="text-right">
            <div className=" mx-auto ">

                <Link to="/config_logado">
                        <button className="!bg-blue-600 !text-white !px-12 !py-2 !rounded-md">
                            <p className="font-bold font-serif">Login</p>
                        </button>
                </Link>

                <Link to="/config_convidado">
                    <p className=" font-serif underline text-black underline-offset-4"> Jogar como convidado   </p>
                </Link>

            </div>
        </div>
    )
}

export default BotaoLogin;