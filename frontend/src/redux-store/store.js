import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authKeyReducer from "../redux-slices/AdminKeySlice";
import userReducer from "../redux-slices/UserSlice";

// Root Reducers
const rootReducer = combineReducers({
  adminKey: authKeyReducer,
  user: userReducer,
});

// Persist Configerations
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Reducers gets persisted
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Config redux global store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
