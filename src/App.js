import { Suspense, lazy } from "react";
import Search from "./components/Search";
import Navbar from "./components/Navbar";

const Info = lazy(() => import("./components/Info"));
const User = lazy(() => import("./components/User"));
const Repos = lazy(() => import("./components/Repos"));

export const App = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
            }}
          >
            Loading
          </div>
        }
      >
        <Info />
        <User />
        <Repos />
      </Suspense>
    </div>
  );
};
