import { useEffect, useState } from "react";

// --- CONFIGURAÇÃO MODULAR ---
// 1. Defina os cabeçalhos e as chaves de dados correspondentes aqui.
// A tabela será renderizada com base nesta configuração.
const headers = [
  { key: "posicao", label: "Posição" },
  { key: "data", label: "Data" },
  { key: "tempo", label: "Tempo" },
  { key: "nivelMax", label: "Nível Máx." },
  { key: "modulos", label: "Módulos" },
];

// 2. Seus dados de exemplo.
// Para adicionar uma nova coluna, adicione a propriedade aqui e no array 'headers' acima.
const historicoData = [
  {
    posicao: 1,
    data: "2024-07-30",
    tempo: "05:12",
    nivelMax: 8,
    modulos: "A, B, C",
  },
  {
    posicao: 2,
    data: "2024-07-29",
    tempo: "07:45",
    nivelMax: 7,
    modulos: "A, B",
  },
  {
    posicao: 3,
    data: "2024-07-28",
    tempo: "04:30",
    nivelMax: 8,
    modulos: "B, C",
  },
  {
    posicao: 4,
    data: "2024-07-27",
    tempo: "12:22",
    nivelMax: 9,
    modulos: "A, B, C, D",
  },
];

function MenuHistorico({ desativar }) {
  const [isShowing, setIsShowing] = useState(false);

  // Efeito para a animação de entrada do modal
  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o modal com animação de saída
  const handleClose = () => {
    setIsShowing(false);
    // Espera a animação de saída terminar antes de chamar a função desativar
    setTimeout(() => desativar(0), 300);
  };

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
        {/* Botão de Fechar como <p> */}
        <p
          onClick={handleClose}
          className="absolute top-2 right-3 px-2 py-1 text-gray-600 rounded-full transition-colors cursor-pointer"
        >
          ❌
        </p>

        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Histórico
        </h2>
        <div className="bg-gray-300 w-full h-px mb-4"></div>

        {/* Tabela para Telas Médias e Maiores (Desktop) */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                {/* Renderiza os cabeçalhos dinamicamente */}
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
              {historicoData.map((item, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {/* Renderiza as células da linha dinamicamente */}
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

        {/* Cards para Telas Pequenas (Mobile) */}
        <div className="md:hidden space-y-3">
          {historicoData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              {/* Renderiza os campos do card dinamicamente */}
              {headers.map((header, headerIndex) => (
                <p key={header.key} className="text-sm text-gray-600">
                  <strong className="font-semibold">{header.label}:</strong>{" "}
                  {item[header.key]}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuHistorico;
