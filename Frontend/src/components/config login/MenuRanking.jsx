import { useEffect, useState } from "react";
import axios from "axios";
import { getText } from "../../ftexto";

// Função para formatar o tempo de segundos para MM:SS
const formatarTempo = (segundos) => {
  if (typeof segundos !== "number" || segundos < 0) return "00:00";
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
};

function MenuRanking(props) {
  const [isShowing, setIsShowing] = useState(false);
  const [top10, setTop10] = useState([]);
  const [posicaoUsuario, setPosicaoUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        setLoading(true);
        // Busca os dados do ranking diário no backend
        const response = await axios.get(
          "http://localhost:8000/leaderboard/ranking-diario/"
        );

        // Adiciona o campo 'posicao' e formata o tempo para o top 10
        const top10Formatado = response.data.top_10.map((item, index) => ({
          ...item,
          posicao: index + 1,
          tempo: formatarTempo(item.tempo),
        }));
        setTop10(top10Formatado);

        // Formata os dados do utilizador, se existirem
        if (response.data.posicao_usuario) {
          const dadosUsuario = response.data.posicao_usuario;
          setPosicaoUsuario({
            ...dadosUsuario.dados,
            posicao: dadosUsuario.rank,
            tempo: formatarTempo(dadosUsuario.dados.tempo),
          });
        }
      } catch (err) {
        setError(
          "Não foi possível carregar o ranking. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => props.desativar(false), 300); // Alterado para desativar(false)
  };

  const headers = [
    {
      key: "posicao",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.posicao",
      }),
    },
    {
      key: "nickname",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.nomeApelido",
      }),
    },
    {
      key: "pais",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.pais",
      }),
    },
    {
      key: "tempo",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.tempo",
      }),
    },
    {
      key: "nivel_max",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.nivelMax",
      }),
    },
    {
      key: "modulos",
      label: getText({
        lang: props.lang,
        endereco: "MenuRanking.modulos",
      }),
    },
  ];

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isShowing ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-11/12 max-w-4xl bg-white rounded-xl shadow-lg font-serif p-6 transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isShowing ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <p
          onClick={handleClose}
          className="absolute top-2 right-3 px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
        >
          ❌
        </p>
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          {getText({
            lang: props.lang,
            endereco: "MenuRanking.rankingDoDia",
          })}
        </h2>
        <div className="bg-gray-300 w-full h-px mb-4"></div>

        {loading && (
          <p className="text-center">
            {" "}
            {getText({
              lang: props.lang,
              endereco: "MenuRanking.aCarregarRanking",
            })}
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Tabela Desktop */}
            <div className="hidden md:block">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    {headers.map((header) => (
                      <th
                        key={header.key}
                        className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700"
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {top10.map((item) => (
                    <tr
                      key={item.id}
                      className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {headers.map((header) => (
                        <td
                          key={header.key}
                          className="border border-gray-300 px-3 py-2"
                        >
                          {item[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Linha do utilizador */}
                  {posicaoUsuario && (
                    <tr className="bg-blue-100 border-t-2 border-blue-400 font-bold">
                      {headers.map((header) => (
                        <td
                          key={header.key}
                          className="border border-gray-300 px-3 py-2 text-blue-800"
                        >
                          {posicaoUsuario[header.key]}
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Cards Mobile */}
            <div className="md:hidden space-y-3">
              {top10.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  {headers.map((header) => (
                    <p key={header.key} className="text-sm text-gray-600">
                      <strong className="font-semibold">{header.label}:</strong>{" "}
                      {item[header.key]}
                    </p>
                  ))}
                </div>
              ))}
              {/* Card do utilizador */}
              {posicaoUsuario && (
                <div className="border-2 border-blue-400 rounded-lg p-4 bg-blue-100 shadow-lg mt-4">
                  <h3 className="font-bold text-blue-800 mb-2">
                    {getText({
                      lang: props.lang,
                      endereco: "MenuRanking.suaMelhorPontuacaoDeHoje",
                    })}
                  </h3>
                  {headers.map((header) => (
                    <p key={header.key} className="text-sm text-blue-700">
                      <strong className="font-semibold">{header.label}:</strong>{" "}
                      {posicaoUsuario[header.key]}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuRanking;
