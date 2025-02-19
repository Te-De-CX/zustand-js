import React, { useState } from "react";
import useAuthStore from "../store/authStore";

const Login: React.FC = () => {
  const { user, loading, login, logout } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      await login(username, password);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </>
      )}
    </div>
  );
};

export default Login;