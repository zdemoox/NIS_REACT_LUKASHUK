import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export type Language = "ru" | "en";

export interface SettingsState {
  theme: Theme;
  language: Language;
  pageSize: number;
}

const initialState: SettingsState = {
  theme: "light",
  language: "ru",
  pageSize: 12
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    }
  }
});

export const { setTheme, setLanguage, setPageSize } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;

