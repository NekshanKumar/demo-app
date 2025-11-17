import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getToken } from "../../utils/auth";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = getToken();
    console.log("Login - checking token:", token);
    if (token) {
      console.log("Login - token found, redirecting to /");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login - submit clicked");
    if (login(data)) {
      console.log("Login - success, redirecting to /");
      navigate("/", { replace: true });
    } else {
      console.log("Login - failed credentials");
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg100">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-96">
        <div className="mb-6 text-2xl font-nunito text-center text-primary600">Login</div>
        <input
          name="username"
          className="w-full mb-4 px-4 py-2 border rounded"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="w-full bg-primary600 text-white py-2 rounded hover:bg-primary500">Sign In</button>
        {error && <div className="mt-3 text-red text-sm">{error}</div>}
      </form>
    </div>
  );
}
