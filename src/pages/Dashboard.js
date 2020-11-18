import React from "react";
import { Info, User, Search, Navbar, Repos } from "../components";

export const Dashboard = () => {
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};
