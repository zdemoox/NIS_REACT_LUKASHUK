import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import { logout } from "@entities/auth/model/authSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="card">
      <h2>{t("profile.title")}</h2>
      {user ? (
        <>
          <p>
            <strong>{t("profile.name")}:</strong> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p>
            <strong>{t("profile.email")}:</strong> {user.email}
          </p>
        </>
      ) : (
        <p>{t("common.error")}</p>
      )}
      <button
        type="button"
        className="btn"
        style={{ marginTop: 12 }}
        onClick={handleLogout}
      >
        {t("profile.logout")}
      </button>
    </div>
  );
};

export default ProfilePage;

