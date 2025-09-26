import { useEffect, useState } from "react";
import axios from "axios"; // Importe o axios para fazer requisições HTTP
import { getText } from "../../ftexto";
function Resgistrar(props) {
  // --- Seus estados existentes ---
  const [close, setClose] = useState(false);
  const [nome, setNome] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSeuNome" })
  );
  const [apelido, setApelido] = useState(
    getText({
      lang: props.lang,
      endereco: "Registrar.insiraSeuApelido",
    })
  );
  const [email, setEmail] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSeuEmail" })
  );
  const [senha, setSenha] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSuaSenha" })
  );
  const [confirmarsenha, setConfirmarsenha] = useState(
    getText({ lang: props.lang, endereco: "Registrar.confirmeSuaSenha" })
  );
  const [instituicao, setInstituicao] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSuaInstituicao" })
  );
  const [pais, setPais] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSeuPais" })
  );
  const [profissao, setProfissao] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSuaProfissao" })
  );
  const [escolaridade, setEscolaridade] = useState(
    getText({ lang: props.lang, endereco: "Registrar.insiraSuaEscolaridade" })
  );

  // --- Novos estados para feedback ao usuário ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Estado para mensagem de sucesso

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // --- Função para lidar com o envio do formulário ---
  const handleRegister = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validação para garantir que as senhas coincidem
    if (senha !== confirmarsenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    // Monta o objeto de dados (payload) como a API Django espera
    const payload = {
      username: apelido, // 'apelido' do React vira 'username' no Django
      email: email,
      password: senha,
      password2: confirmarsenha,
      nome: nome,
      profile: {
        instituicao: instituicao,
        pais: pais,
        profissao: profissao,
        escolaridade: escolaridade,
      },
    };

    try {
      // A URL DEVE SER a de registo, não a de login (`/api/token/`)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        payload
      );

      console.log("Usuário registrado com sucesso:", response.data);
      setSuccess(true); // Ativa a mensagem de sucesso
      // Fecha o modal após um breve período para o utilizador ver a mensagem
      setTimeout(() => {
        props.desativar(0);
      }, 2000);
    } catch (err) {
      console.error("Erro no registro:", err.response?.data);
      let errorMessage = "Ocorreu um erro. Tente novamente.";
      if (err.response && err.response.data) {
        // Formata os erros do Django para serem mais legíveis
        const errors = err.response.data;
        const messages = Object.keys(errors).map((key) => {
          // Transforma a chave e a mensagem de erro numa string legível
          return `${key}: ${errors[key].join(", ")}`;
        });
        errorMessage = messages.join(" ");
      }
      setError(errorMessage);
    } finally {
      // Garante que o estado de loading seja desativado no final
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          if (close) {
            props.desativar(0);
          }
        }}
        className="fixed inset-0 backdrop-blur-sm z-40 bg-black/40"
      ></div>

      <form
        onSubmit={handleRegister}
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center bg-white border border-black rounded-xl shadow-lg p-6 w-auto max-w-2xl font-serif"
      >
        <p className="font-semibold !self-center text-xl">
          {getText({ lang: props.lang, endereco: "Registrar.registro" })}
        </p>
        <div className="bg-gray-300 w-full h-1 mb-6"></div>

        {/* --- Campos de input --- */}
        <p className="font-semibold text-left">
          {getText({ lang: props.lang, endereco: "Registrar.nome" })}
        </p>
        <input
          className="border w-full mb-5 p-2 rounded"
          type="text"
          value={nome}
          onFocus={() => {
            if (
              nome ===
              getText({ lang: props.lang, endereco: "Registrar.insiraSeuNome" })
            )
              setNome("");
          }}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <div>
          <p className="font-semibold text-left">
            {getText({ lang: props.lang, endereco: "Registrar.apelido" })}{" "}
          </p>
          <input
            className="border w-full mb-5 p-2 rounded"
            type="text"
            value={apelido}
            onFocus={() => {
              if (
                apelido ===
                getText({
                  lang: props.lang,
                  endereco: "Registrar.insiraSeuApelido",
                })
              )
                setApelido("");
            }}
            onChange={(e) => setApelido(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="font-semibold text-left">
            {getText({ lang: props.lang, endereco: "Registrar.email" })}{" "}
          </p>
          <input
            className="border w-full mb-5 p-2 rounded"
            type="email"
            value={email}
            onFocus={() => {
              if (
                email ===
                getText({
                  lang: props.lang,
                  endereco: "Registrar.insiraSeuEmail",
                })
              )
                setEmail("");
            }}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="font-semibold text-left">
            {getText({ lang: props.lang, endereco: "Registrar.senha" })}{" "}
          </p>
          <input
            className="border w-full mb-5 p-2 rounded"
            type="password"
            value={senha}
            onFocus={() => {
              if (
                senha ===
                getText({
                  lang: props.lang,
                  endereco: "Registrar.insiraSuaSenha",
                })
              )
                setSenha("");
            }}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div>
          <p className="font-semibold text-left">
            {getText({
              lang: props.lang,
              endereco: "Registrar.confirmarSenha",
            })}{" "}
          </p>
          <input
            className="border w-full mb-5 p-2 rounded"
            type="password"
            value={confirmarsenha}
            onFocus={() => {
              if (
                confirmarsenha ===
                getText({
                  lang: props.lang,
                  endereco: "Registrar.confirmeSuaSenha",
                })
              )
                setConfirmarsenha("");
            }}
            onChange={(e) => setConfirmarsenha(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-row gap-8">
          <div className="flex flex-col flex-1">
            <div>
              <p className="font-semibold text-left">
                {getText({
                  lang: props.lang,
                  endereco: "Registrar.instituicao",
                })}
              </p>
              <input
                className="border w-full mb-5 p-2 rounded"
                type="text"
                value={instituicao}
                onFocus={() => {
                  if (
                    instituicao ===
                    getText({
                      lang: props.lang,
                      endereco: "Registrar.insiraSuaInstituicao",
                    })
                  )
                    setInstituicao("");
                }}
                onChange={(e) => setInstituicao(e.target.value)}
              />
            </div>
            <div>
              <p className="font-semibold text-left">
                {getText({ lang: props.lang, endereco: "Registrar.pais" })}{" "}
              </p>
              <input
                className="border w-full mb-5 p-2 rounded"
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                onFocus={() => {
                  if (
                    pais ===
                    getText({
                      lang: props.lang,
                      endereco: "Registrar.insiraSeuPais",
                    })
                  )
                    setPais("");
                }}
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div>
              <p className="font-semibold text-left">
                {getText({ lang: props.lang, endereco: "Registrar.profissao" })}{" "}
              </p>
              <input
                className="border w-full mb-5 p-2 rounded"
                type="text"
                value={profissao}
                onFocus={() => {
                  if (
                    profissao ===
                    getText({
                      lang: props.lang,
                      endereco: "Registrar.insiraSuaProfissao",
                    })
                  )
                    setProfissao("");
                }}
                onChange={(e) => setProfissao(e.target.value)}
              />
            </div>
            <div>
              <p className="font-semibold text-left">
                {getText({
                  lang: props.lang,
                  endereco: "Registrar.escolaridade",
                })}{" "}
              </p>
              <input
                className="border w-full mb-5 p-2 rounded"
                type="text"
                value={escolaridade}
                onFocus={() => {
                  if (
                    escolaridade ===
                    getText({
                      lang: props.lang,
                      endereco: "Registrar.insiraSuaEscolaridade",
                    })
                  )
                    setEscolaridade("");
                }}
                onChange={(e) => setEscolaridade(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Exibe a mensagem de sucesso ou erro */}
        {success && (
          <p className="text-green-500 text-center mb-4">
            Cadastro realizado com sucesso! A fechar...
          </p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Botão de cadastro com estado de loading */}
        <button
          type="submit"
          className="!bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-center disabled:bg-blue-300"
          disabled={loading || success} // Desativa o botão durante o loading ou após o sucesso
        >
          {loading
            ? getText({
                lang: props.lang,
                endereco: "Registrar.cadastroRealizadoComSucesso",
              })
            : getText({ lang: props.lang, endereco: "Registrar.cadastrar" })}
        </button>
      </form>
    </div>
  );
}

export default Resgistrar;
