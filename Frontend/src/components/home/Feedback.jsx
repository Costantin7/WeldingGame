import { useEffect, useState } from "react";
import Linha from "./LinhaHorizontal";
import { getText } from "../../ftexto";
function Feedback(props) {
  // State para controlar a visibilidade e acionar a animação
  const [isShowing, setIsShowing] = useState(false);
  const [page, setPage] = useState(0);
  const [text1, setText1] = useState(
    getText({
      lang: props.lang,
      endereco: "Feedback.insiraSeuEmail",
    })
  );
  const [text2, setText2] = useState(
    getText({
      lang: props.lang,
      endereco: "Feedback.insiraCodigo",
    })
  );
  const [text3, setText3] = useState(
    getText({
      lang: props.lang,
      endereco: "Feedback.insiracomentario",
    })
  );
  // useEffect para a animação de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowing(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o modal com animação de saída
  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => {
      props.desativar(0);
    }, 300);
  };

  return (
    <div>
      {/* Backdrop (Fundo) */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${isShowing ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* Modal (Conteúdo) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative z-50 w-11/12 max-w-2xl h-auto max-h-[85vh] overflow-y-auto bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 font-serif transition-all duration-300
            ${
              isShowing
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }
          `}
        >
          {/* MUDANÇA: Retornando ao 'X' original */}
          <div
            className="place-self-end w-8 flex justify-end px-4 py-1 cursor-pointer"
            onClick={handleClose}
          >
            <p>❌</p>
          </div>

          {/* Conteúdo da Página 1 */}
          {page === 0 && (
            <div>
              <p className="my-4 text-xl font-bold">
                {" "}
                {getText({
                  lang: props.lang,
                  endereco: "Feedback.feedback",
                })}
              </p>
              <div className="bg-gray-300 w-full h-1 mb-6 "></div>
              <p className="my-3 text-gray-700">
                {getText({
                  lang: props.lang,
                  endereco: "Feedback.dearWeldingEnthusiast",
                })}
              </p>
              <button
                onClick={() => setPage(1)}
                className="!bg-blue-500 text-white font-bold py-2 px-4 rounded my-10"
              >
                {getText({
                  lang: props.lang,
                  endereco: "Feedback.proximaPagina",
                })}
              </button>
            </div>
          )}

          {/* Conteúdo da Página 2 */}
          {page === 1 && (
            <div>
              <p className="my-4 text-xl font-bold">
                {" "}
                {getText({
                  lang: props.lang,
                  endereco: "Feedback.feedback",
                })}
              </p>
              <div className="bg-gray-300 w-full h-1 mb-6 "></div>
              <p className="text-gray-700">
                {getText({
                  lang: props.lang,
                  endereco: "Feedback.insiraSeuEmail",
                })}
              </p>

              <input
                className="border w-full mb-5"
                type="text"
                value={text1}
                onFocus={() => {
                  if (
                    text1 ===
                    getText({
                      lang: props.lang,
                      endereco: "Feedback.insiraSeuEmail",
                    })
                  ) {
                    setText1("");
                  }
                }}
                onChange={(e) => {
                  setText1(e.target.value);
                }}
              />
              <p className="text-gray-700">Código da pergunta</p>

              <input
                className="border w-full mb-5"
                type="text"
                value={text2}
                onFocus={() => {
                  if (
                    text2 ===
                    getText({
                      lang: props.lang,
                      endereco: "Feedback.insiraCodigo",
                    })
                  ) {
                    setText2("");
                  }
                }}
                onChange={(e) => {
                  setText2(e.target.value);
                }}
              />

              <p className="text-gray-700">Comentário</p>

              <input
                className="border w-full mb-5"
                type="text"
                value={text3}
                onFocus={() => {
                  if (
                    text3 ===
                    getText({
                      lang: props.lang,
                      endereco: "Feedback.insiracomentario",
                    })
                  ) {
                    setText3("");
                  }
                }}
                onChange={(e) => {
                  setText3(e.target.value);
                }}
              />
              <button className="!bg-green-500 text-white font-bold py-2 px-4 rounded my-10 mx-5">
                Enviar
              </button>

              <button
                onClick={() => setPage(0)}
                className="!bg-blue-500 text-white font-bold py-2 px-4 rounded my-10"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
