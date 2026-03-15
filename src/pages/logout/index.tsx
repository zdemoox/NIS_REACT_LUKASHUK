import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@shared/lib/hooks";
import { logout } from "@entities/auth/model/authSlice";

const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(logout());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return (
    <div className="card">
      <h2>{t("logout.title")}</h2>
      <p>{t("logout.message")}</p>
    </div>
  );
};

export default LogoutPage;

