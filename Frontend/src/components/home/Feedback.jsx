import { useEffect, useState } from "react";

function Feedback(props) {
  const [close, setClose] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <div
        onClick={() => {
          if (close) {
            props.desativar(0);
          }
        }}
        className="fixed inset-0 backdrop-blur-lg z-40 bg-black/40"
      ></div>

      <div className=" relative fixed top-20 right-80 z-50 bg-white border border-black rounded-xl shadow-lg p-6 space-y-3 w-150 h-150 font-serif">
        <div
          className="place-self-end w-8 flex justify-center px-4 py-1 cursor-pointer center-items"
          onClick={() => {
            if (close) {
              props.desativar(0);
            }
          }}
        >
          <p>❌</p>
        </div>
        {page == 0 && (
          <div>
            <p className="my-4 font-bold">Feedback</p>
            <p>
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
              onClick={() => {
                if (close) {
                  setPage(1);
                }
              }}
              className="!bg-blue-500 my-10"
            >
              Próxima Página
            </button>
          </div>
        )}

        {page == 1 && (
          <div>
            <p className="my-4 font-bold">Feedback</p>
            <p>
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
              onClick={() => {
                if (close) {
                  setPage(0);
                }
              }}
              className="!bg-blue-500 my-10"
            >
              Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
