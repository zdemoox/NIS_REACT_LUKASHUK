import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import { store, persistor } from "@app/store";
import { AppRouter } from "@app/router";
import { ThemeProvider } from "@shared/ui/ThemeProvider";
import i18n from "@shared/config/i18n";
import "@shared/styles/index.css";

const rootElement = document.getElementById("root")!;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ThemeProvider>
              <AppRouter />
            </ThemeProvider>
          </BrowserRouter>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

