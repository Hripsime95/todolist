import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppHTTP } from "./app/AppHTTP";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <AppHTTP />
      </StrictMode>
    </Provider>
  </BrowserRouter>);
