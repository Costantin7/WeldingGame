import { useEffect, useState } from "react";
import axios from "axios";
import { getText } from "../../ftexto";
// --- FUNÇÕES AUXILIARES ---
// Função para formatar o tempo de segundos para MM:SS
const formatarTempo = (segundos) => {
  if (typeof segundos !== "number" || segundos < 0) return "00:00";
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
};

function MenuHistorico(props) {
  // --- ESTADOS DO COMPONENTE ---
  const [isShowing, setIsShowing] = useState(false);
  const [historico, setHistorico] = useState([]);
  const [dataFiltro, setDataFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- LÓGICA DE BUSCA DE DADOS ---
  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        setLoading(true);
        setError(null);
        // Pega o token de autenticação guardado no login
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError(
            "Utilizador não autenticado. Por favor, faça login novamente."
          );
          setLoading(false);
          return;
        }

        // Prepara os parâmetros para a chamada da API
        const params = {};
        if (dataFiltro) {
          params.data = dataFiltro;
        }

        const response = await axios.get(
          "http://localhost:8000/leaderboard/historico/",
          {
            headers: { Authorization: `Bearer ${authToken}` }, // Envia o token
            params: params,
          }
        );

        // Formata o tempo de cada registo do histórico
        const historicoFormatado = response.data.map((item) => ({
          ...item,
          tempo: formatarTempo(item.tempo),
        }));
        setHistorico(historicoFormatado);
      } catch (err) {
        setError(
          "Não foi possível carregar o histórico. Tente novamente mais tarde."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [dataFiltro]); // Refaz a busca sempre que a data do filtro mudar

  // Efeito para a animação de entrada do modal
  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o modal com animação de saída
  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => props.desativar(false), 300);
  };

  // --- CONFIGURAÇÃO DA TABELA ---
  const headers = [
    { key: "data", label: "Data" },
    { key: "nivel_max", label: "Nível Máx." },
    { key: "tempo", label: "Tempo Total" },
    { key: "modulos", label: "Módulos" },
  ];

  return (
    // Backdrop (fundo escurecido e com blur)
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isShowing ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Modal (conteúdo principal) */}
      <div
        onClick={(e) => e.stopPropagation()} // Impede que o clique no modal feche-o
        className={`relative w-11/12 max-w-4xl bg-white rounded-xl shadow-lg font-serif p-6 transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isShowing ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Botão de Fechar */}
        <p
          onClick={handleClose}
          className="absolute top-2 right-3 px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
        >
          ❌
        </p>

        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Seu Histórico de Jogos
        </h2>
        <div className="bg-gray-300 w-full h-px mb-4"></div>

        {/* Filtro de Data */}
        <div className="mb-4 flex items-center space-x-4">
          <label
            htmlFor="data-filtro"
            className="block text-sm font-medium text-gray-700"
          >
            Filtrar por data:
          </label>
          <input
            type="date"
            id="data-filtro"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          <button
            onClick={() => setDataFiltro("")}
            className="text-sm !bg-blue-500 text-white hover:underline"
          >
            Limpar filtro
          </button>
        </div>

        {/* Indicadores de Estado */}
        {loading && <p className="text-center">A carregar histórico...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && historico.length > 0 && (
          <>
            {/* Tabela para Desktop */}
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
                  {historico.map((item) => (
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
                </tbody>
              </table>
            </div>

            {/* Cards para Mobile */}
            <div className="md:hidden space-y-3">
              {historico.map((item) => (
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
            </div>
          </>
        )}

        {/* Mensagem para quando não há resultados */}
        {!loading && !error && historico.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Nenhum resultado encontrado para os filtros selecionados.
          </p>
        )}
      </div>
    </div>
  );
}

export default MenuHistorico;
