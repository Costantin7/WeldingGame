import { useEffect, useState } from "react";

// A lista de contribuidores permanece a mesma.
const contribuidores = [
  {
    name: "Vladimir Ponomarov",
    country: "Brazil",
    contribution: "General coordination, question developer (2008 – present)",
  },
  {
    name: "Ana Teresa Taveira Bachur",
    country: "Brazil",
    contribution: "Present layout, …. (2021 – 2022)",
  },
  {
    name: "Tássio de Farias Gomes",
    country: "Brazil",
    contribution: "Present layout, …. (2021 – 2022)",
  },
  {
    name: "Ron Nickel",
    country: "Canada",
    contribution: "Question developer (2022)",
  },
  {
    name: "Felipe Chagas R. de Souza",
    country: "Brazil",
    contribution: "Quiz first functional version improvement (2019)",
  },
  {
    name: "Kauê Oliveira Drigo",
    country: "Brazil",
    contribution: "First functional version of the quiz (2018)",
  },
  {
    name: "Ruslan Didkivskyi",
    country: "Ukraine",
    contribution: "Very first draft version (2009)",
  },
  {
    name: "Maria Clara Silva Borges",
    country: "Brazil",
    contribution: "Current design and aesthetics",
  },
  {
    name: "Heitor Raimundo Domingues Pereira do Prado",
    country: "Brazil",
    contribution: "Full stack coder",
  },
  {
    name: "Gabriel Freitas Costantin",
    country: "Brazil",
    contribution: "Full stack coder",
  },
];

function Sobrenos({ desativar }) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsShowing(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Função para fechar o modal com animação
  const handleClose = () => {
    setIsShowing(false);
    setTimeout(() => desativar(0), 300); // 300ms é a duração da animação
  };

  return (
    // Backdrop (fundo)
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isShowing ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Modal (conteúdo) */}
      <div
        onClick={(e) => e.stopPropagation()}
        // MUDANÇA: As classes de animação foram trocadas aqui.
        className={`relative w-11/12 max-w-4xl bg-white rounded-xl shadow-lg font-serif p-6 transition-all duration-300 max-h-[85vh] overflow-y-auto ${
          isShowing ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Cabeçalho com o botão de emoji */}
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-bold">Sobre nós</h2>
          <p onClick={handleClose} className="text-xl p-1 -mt-1 !bg-white">
            ❌
          </p>
        </div>

        <p className="mb-4 text-gray-600">
          Veja abaixo os contribuidores deste projeto:
        </p>

        {/* Tabela para Desktop */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Nome
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  País
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Contribuição
                </th>
              </tr>
            </thead>
            <tbody>
              {contribuidores.map((pessoa, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    {pessoa.name}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {pessoa.country}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {pessoa.contribution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards para Mobile */}
        <div className="md:hidden space-y-3">
          {contribuidores.map((pessoa, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 bg-gray-50"
            >
              <h3 className="font-bold text-gray-800">{pessoa.name}</h3>
              <p className="text-sm text-gray-600">
                <strong>País:</strong> {pessoa.country}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Contribuição:</strong> {pessoa.contribution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sobrenos;
