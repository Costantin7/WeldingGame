import { useEffect, useState } from "react";
import winVideo from "../../img/videos/win.mp4";

// ALTERAÇÃO 1: A prop foi alterada de { onClose } para (props)
function TelaVitoria(props) {
  // ALTERAÇÃO 2: O nome do estado foi alterado para 'close'
  const [close, setClose] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => {
          if (close) {
            props.desativar(0);
          }
        }}
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 min-w-[55vw] min-h-[45vh] bg-white rounded-xl shadow-2xl font-serif">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-600">Você venceu!</h2>
          <div
            onClick={() => {
              props.desativar(0);
            }}
            className="cursor-pointer p-1"
            aria-label="Fechar"
          >
            <p className="text-xl">❌</p>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6">
          <video
            className="w-full rounded-lg shadow-lg mx-auto"
            src={winVideo}
            autoPlay
            loop
            muted
            playsInline
          >
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl items-center justify-center">
          <button
            onClick={() => {
              props.desativar(0);
            }}
            className="px-5 py-2 !bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaVitoria;
