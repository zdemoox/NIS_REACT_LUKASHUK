import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <h2>{t("dashboard.title")}</h2>
      <p>{t("dashboard.welcome")}</p>
    </div>
  );
};

export default DashboardPage;

