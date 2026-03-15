import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLoginMutation, type User } from "@shared/api/dummyApi";
import { useAppDispatch } from "@shared/lib/hooks";
import { setCredentials, setUser } from "@entities/auth/model/authSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("vivere115");
  const [password, setPassword] = useState("hse-2005");
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (username === "vivere115" && password === "hse-2005") {
      const fakeUser: User = {
        id: 1,
        username,
        email: "vivere115@example.com",
        firstName: "Vivere",
        lastName: "115"
      };
      dispatch(setCredentials({ token: "FAKE_TOKEN", user: fakeUser }));
      navigate("/", { replace: true });
      return;
    }
    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ token: res.token, user: res }));
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        (err as any).data &&
        typeof (err as any).data === "object" &&
        "message" in (err as any).data
      ) {
        const apiMessage = String((err as any).data.message);
        setError(`${t("auth.error")}: ${apiMessage}`);
      } else {
        setError(t("auth.error"));
      }
      console.error("login error", err);
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <h2>{t("auth.loginTitle")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>{t("auth.username")}</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="field">
            <label>{t("auth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div style={{ color: "#f97373", fontSize: 13, marginBottom: 8 }}>
              {error}
            </div>
          )}
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("auth.submit")}
          </button>
        </form>
        <div style={{ marginTop: 12, fontSize: 13 }}>
          <Link to="/register">{t("auth.registerLink")}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

