import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const { t } = useTranslation();
  return (
    <div className="content">
      <div className="card">
        <h2>{t("auth.registerLink")}</h2>
        <p style={{ fontSize: 14, opacity: 0.9 }}>
          DummyJSON не поддерживает полноценную регистрацию, поэтому это
          демонстрационная страница. Используйте тестовые креды{" "}
          <code>vivere115 / hse-2005</code>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

