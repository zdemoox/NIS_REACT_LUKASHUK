import { Outlet, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@shared/lib/hooks";

export const PrivateLayout = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">Admin</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end>
            {t("nav.dashboard")}
          </NavLink>
          <NavLink to="/products">{t("nav.products")}</NavLink>
          <NavLink to="/profile">{t("nav.profile")}</NavLink>
          <NavLink to="/settings">{t("nav.settings")}</NavLink>
          <NavLink to="/logout">{t("nav.logout")}</NavLink>
        </nav>
      </aside>
      <div className="main">
        <header className="header">
          <div>{t("layout.greeting", { name: user?.firstName || "User" })}</div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

