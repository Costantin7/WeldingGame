import idiomas from "./idioma.js";
/**
 * Busca um texto traduzido navegando por um objeto aninhado.
 * @param {object} params - Os parâmetros para a busca.
 * @param {number} params.lang - O índice do idioma (0 para 'pt', 1 para 'en').
 * @param {string} params.endereco - O caminho para o texto, separado por pontos (ex: "Configjogo.materiais").
 * @returns {string} O texto traduzido ou o endereço como fallback em caso de erro.
 */
export function getText({ lang, endereco }) {
  // Define qual chave de idioma usar ('pt' ou 'en') com base no número.
  const langKey = lang === 0 ? "pt" : "en";

  try {
    // Quebra o endereço em chaves: "Configjogo.materiais" -> ['Configjogo', 'materiais']
    const keys = endereco.split(".");

    // Navega pelo objeto 'idiomas' usando as chaves
    let result = idiomas;
    for (const key of keys) {
      result = result[key];
    }

    // Após encontrar o objeto final, pega a tradução pela chave 'pt' ou 'en'
    if (result && result[langKey]) {
      return result[langKey];
    } else {
      // Se não encontrar o texto final, mas o caminho existir, retorna um aviso
      console.warn(
        `Tradução para "${langKey}" não encontrada em: "${endereco}"`
      );
      return endereco;
    }
  } catch (error) {
    // Se o caminho (endereço) for inválido, avisa no console e retorna o próprio endereço.
    console.error(`Erro ao traduzir o endereço: "${endereco}"`, error);
    return endereco;
  }
}
