import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";
import userReducer from "./login/loginSlice";
import todoReducer from "./todo/todoSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "todos"], // Only persist user and todos slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
