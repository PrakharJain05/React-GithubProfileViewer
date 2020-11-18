import { StrictMode } from "react";
import { render } from "react-dom";
import "./index.css";
import { App } from "./App";
import { GithubProvider } from "./context";

render(
  <StrictMode>
    <GithubProvider>
      <App />
    </GithubProvider>
  </StrictMode>,
  document.getElementById("root")
);
