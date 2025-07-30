import { useEffect, useState } from "react";

function Feedback(props) {
  // State para controlar a visibilidade e acionar a animação
  const [isShowing, setIsShowing] = useState(false);
  const [page, setPage] = useState(0);

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
            ${isShowing ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
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
              <p className="my-4 text-xl font-bold">Feedback</p>
              <p className="text-gray-700">
                Dear Welding Enthusiast, You are welcome to assess your welding
                knowledge by answering this quiz! The quiz structure is based on
                the IIW-IAB welding personnel qualification system consisting of
                four modules: Welding Processes, Materials, Welding Design and
                Fabrication. You can choose one of four modules or any combination
                of them. The quiz is composed by multiple-choice questions grouped
                in 20 difficulty levels. There are 3000 questions in this quiz.
                Each question has only one correct answer. In order to confirm the
                correct answer choice, you have to click on “Enter”. You can
                choose the “Timer” option (60 s to answer the question) or “No
                Timer” option. In this first version of the quiz, there are only
                two languages available: English and Portuguese (Brazil). The
                functions “Last week winner” and “Your victories” are not
                activated yet. The quiz was developed in the Federal University of
                Uberlandia (https://ufu.br), Faculty of Mechanical Engineering,
                Welding Group (Laprosolda). Your comments and suggestions are very
                welcome: ...@...
              </p>
              <button
                onClick={() => setPage(1)}
                className="!bg-blue-500 text-white font-bold py-2 px-4 rounded my-10"
              >
                Próxima Página
              </button>
            </div>
          )}

          {/* Conteúdo da Página 2 */}
          {page === 1 && (
            <div>
              <p className="my-4 text-xl font-bold">Feedback</p>
              <p className="text-gray-700">
                This is the second page of the feedback modal. You can place
                different content here. The structure is based on the IIW-IAB welding
                personnel qualification system consisting of four modules:
                Welding Processes, Materials, Welding Design and Fabrication...
                (Sample text for page 2).
              </p>
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