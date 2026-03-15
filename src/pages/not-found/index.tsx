import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="card">
      <h2>{t("notFound.title")}</h2>
      <Link to="/" className="btn" style={{ marginTop: 12, display: "inline-flex" }}>
        {t("common.back")}
      </Link>
    </div>
  );
};

export default NotFoundPage;

