import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appcontext } from "../App";
import styled from "./loggin.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsloggin } = useContext(appcontext);
  const navigate = useNavigate();

  // ===== اعتبارسنجی =====
  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 یوزرنیم و پسورد ثابت (هر چی دوست داری تغییر بده)
    const validUsername = "mehdiabl77";
    const validPassword = "80755708";

    if (username === validUsername && password === validPassword) {
      setIsloggin(true);
      setError("");
      navigate("/AddPost"); // بعد از لاگین بره به صفحه افزودن کالا
    } else {
      setError("❌ یوزرنیم یا رمز عبور اشتباه است!");
    }
  };

  return (
    <div className={styled.container}>
      <div className={styled.card}>
        <h2 className={styled.title}>🔐 ورود به پنل مدیریت</h2>

        <form onSubmit={handleLogin} className={styled.form}>
          <div className={styled.inputGroup}>
            <label>یوزرنیم</label>
            <input
              type="text"
              placeholder="مثلاً admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styled.input}
              required
            />
          </div>

          <div className={styled.inputGroup}>
            <label>رمز عبور</label>
            <input
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styled.input}
              required
            />
          </div>

          {error && <p className={styled.error}>{error}</p>}

          <button type="submit" className={styled.loginButton}>
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;