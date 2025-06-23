import { useEffect, useState, useMemo } from "react";
import axios from "axios";

function Game_teste_P(props) {
  const [pergunta, setPergunta] = useState(null);
  const { nivel, Addlevel } = props;

  const idioma = props.idiomaprop;

  // Memoriza o array de temas excluídos
  const temasExcluidos = useMemo(() => {
    const temas = [];
    if (!props.modulo1) temas.push(1); // Processos
    if (!props.modulo2) temas.push(2); // Materiais
    if (!props.modulo3) temas.push(3); // Projeto
    if (!props.modulo4) temas.push(4); // Fabricação
    return temas;
  }, [props.modulo1, props.modulo2, props.modulo3, props.modulo4]);

  // Função auxiliar para saber se um tema está excluído
  const isExcluido = (tema) => (temasExcluidos.includes(tema) ? "1" : "0");

  useEffect(() => {
    async function fetchPergunta() {
      try {
        const response = await axios.get("http://localhost:8000/perguntas/", {
          params: {
            idioma: idioma.toString(),
            nivel: nivel.toString(),
            tema1: isExcluido(1),
            tema2: isExcluido(2),
            tema3: isExcluido(3),
            tema4: isExcluido(4),
          },
        });

        setPergunta(response.data);
      } catch (error) {
        console.error("Erro ao buscar pergunta:", error);
        setPergunta(null);
      }
    }

    fetchPergunta();
  }, [nivel, idioma, temasExcluidos]);

  return (
    <div>
      <h1>Questionário</h1>

      {pergunta ? (
        <div>
          <div>
            <label>Idioma:</label>
            <input type="text" value={pergunta.idioma} readOnly />
          </div>

          <div>
            <label>Pergunta:</label>
            <textarea value={pergunta.pergunta} readOnly />
          </div>

          <div>
            <label>Resposta 1:</label>
            <input type="text" value={pergunta.resposta_0} readOnly />
          </div>
          <div>
            <label>Resposta 2:</label>
            <input type="text" value={pergunta.resposta_1} readOnly />
          </div>
          <div>
            <label>Resposta 3:</label>
            <input type="text" value={pergunta.resposta_2} readOnly />
          </div>
          <div>
            <label>Resposta 4:</label>
            <input type="text" value={pergunta.resposta_3} readOnly />
          </div>

          <div>
            <label>Tema:</label>
            <input type="text" value={pergunta.tema} readOnly />
          </div>

          <div>
            <label>Nível:</label>
            <input type="text" value={pergunta.nivel} readOnly />
          </div>

          <button onClick={Addlevel}>Avançar Nível</button>
        </div>
      ) : (
        <p>Carregando pergunta...</p>
      )}
    </div>
  );
}

export default Game_teste_P;
