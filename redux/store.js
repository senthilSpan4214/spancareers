import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/Auth/authSlice";
import authCareerReducer from "@/redux/authCareers/careerSlice";
import {
  persistReducer,
  persistStore,
  REGISTER,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
};

const authCareerPersistConfig = {
  key: "authCareer",
  storage,
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const authCareerPersistedReducer = persistReducer(
  authCareerPersistConfig,
  authCareerReducer
);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    authCareer: authCareerPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
