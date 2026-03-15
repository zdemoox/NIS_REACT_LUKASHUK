import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { dummyApi } from "@shared/api/dummyApi";
import { authReducer } from "@entities/auth/model/authSlice";
import { settingsReducer } from "@entities/settings/model/settingsSlice";

const rootReducer = combineReducers({
  [dummyApi.reducerPath]: dummyApi.reducer,
  auth: authReducer,
  settings: settingsReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "settings"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(dummyApi.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

