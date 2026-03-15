import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks";
import {
  setLanguage,
  setPageSize,
  setTheme
} from "@entities/settings/model/settingsSlice";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const settings = useAppSelector((s) => s.settings);
  const dispatch = useAppDispatch();

  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(e.target.value as "light" | "dark"));
  };

  const handleLangChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value as "ru" | "en";
    dispatch(setLanguage(lng));
    i18n.changeLanguage(lng);
  };

  const handlePageSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value) || 1;
    dispatch(setPageSize(value));
  };

  return (
    <div className="card">
      <h2>{t("settings.title")}</h2>
      <div className="field">
        <label>{t("settings.theme")}</label>
        <select value={settings.theme} onChange={handleThemeChange}>
          <option value="light">{t("settings.themeLight")}</option>
          <option value="dark">{t("settings.themeDark")}</option>
        </select>
      </div>
      <div className="field">
        <label>{t("settings.language")}</label>
        <select value={settings.language} onChange={handleLangChange}>
          <option value="ru">{t("settings.langRu")}</option>
          <option value="en">{t("settings.langEn")}</option>
        </select>
      </div>
      <div className="field">
        <label>{t("settings.pageSize")}</label>
        <input
          type="number"
          min={1}
          max={100}
          value={settings.pageSize}
          onChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default SettingsPage;

