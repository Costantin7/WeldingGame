import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginUsuario(props) {
  // --- Estados do componente ---
  const [close, setClose] = useState(false);
  // 1. Renomeamos o estado para ser mais genérico
  const [loginInput, setLoginInput] = useState("Usuário ou e-mail");
  const [password, setPassword] = useState("senha");

  // --- Novos estados para feedback ao usuário ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hook para navegação programática
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // --- Função para lidar com o envio do formulário de login ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 2. O payload ainda usa a chave 'username', como nosso backend espera
    const payload = {
      username: loginInput,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        payload
      );

      const token = response.data.access;

      if (token) {
        localStorage.setItem("authToken", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // 3. ETAPA EXTRA: Buscamos os dados do perfil para pegar o username correto
        const profileResponse = await axios.get(
          "http://127.0.0.1:8000/api/user/me/"
        );

        // 4. Atualiza o estado global com o username que veio da API
        props.setUsername(profileResponse.data.username);

        // Fecha o modal e navega para a próxima página
        props.desativar(0);
        navigate("/config_logado");
      } else {
        setError("Token não recebido da API. Verifique a resposta do backend.");
      }
    } catch (err) {
      console.error("Erro no login:", err.response?.data);
      setError("Usuário ou senha inválidos. Tente novamente.");
    } finally {
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
        onSubmit={handleLogin}
        className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-black rounded-xl shadow-lg p-6 w-[480px] h-auto font-serif"
      >
        <p className="font-semibold !self-center text-xl">Login</p>
        <div className="bg-gray-300 w-full h-1 my-4"></div>

        {/* 5. Textos e estados do input atualizados */}
        <label htmlFor="usuario" className="font-semibold self-start mb-1">
          Usuário ou E-mail:
        </label>
        <input
          id="usuario"
          className="border p-2 rounded w-full mb-5"
          type="text"
          value={loginInput}
          onFocus={() => {
            if (loginInput === "Usuário ou e-mail") setLoginInput("");
          }}
          onChange={(e) => setLoginInput(e.target.value)}
          required
        />

        <label htmlFor="senha" className="font-semibold self-start mb-1">
          Senha:
        </label>
        <input
          id="senha"
          className="border p-2 rounded w-full mb-9"
          type="password"
          value={password}
          onFocus={() => {
            if (password === "senha") setPassword("");
          }}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="!bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded self-center"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Fazer Login"}
        </button>

        <div className="flex flex-row justify-between w-full mt-6">
          <div className="flex flex-col items-center">
            <p className="text-sm">Não tem cadastro?</p>
            <p
              onClick={() => {
                if (close) props.desativar(3);
              }}
              className="text-blue-800 underline cursor-pointer text-sm"
            >
              Fazer Registro
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="self-center text-sm">Esqueceu a senha?</p>
            <p
              onClick={() => {
                if (close) props.desativar(2);
              }}
              className="text-blue-800 underline cursor-pointer self-center text-sm"
            >
              Recuperar senha
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginUsuario;
