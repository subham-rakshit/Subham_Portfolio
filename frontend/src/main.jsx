import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux-store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </PersistGate>
);
