import idiomaData from "../idioma"; // Renomeei para idiomaData para evitar conflito de nome

/**
 * Retorna o texto traduzido com base no idioma e no endereço (caminho do objeto).
 * @param {object} props - As propriedades.
 * @param {number} props.idioma - O código do idioma (0 para PT, 1 para EN).
 * @param {string} props.endereço - O caminho para a tradução. Ex: "Tittle.jogoDeSoldagem".
 * @returns {string} - O texto traduzido ou uma mensagem de erro.
 */
function texto(props) {
  const { idioma: lang, endereço } = props;

  // Separa o caminho por pontos. Ex: "Tittle.jogoDeSoldagem" vira ["Tittle", "jogoDeSoldagem"]
  const pathParts = endereço.split(".");

  // Navega pelo objeto de idiomas usando o caminho fornecido
  let translationObject = pathParts.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    idiomaData
  );

  if (!translationObject) {
    return `Erro: Caminho "${endereço}" não encontrado.`;
  }

  if (lang === 0) {
    return translationObject.pt || `Tradução PT para "${endereço}" faltando.`;
  } else if (lang === 1) {
    return translationObject.en || `Tradução EN para "${endereço}" faltando.`;
  } else {
    return "Erro: Idioma não suportado.";
  }
}

export default texto;
