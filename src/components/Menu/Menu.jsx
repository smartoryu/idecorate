import React from "react";

import { TopNavbarMenu } from "./_TopNavbar";
import { MainNavbarMenu } from "./_MainNavbar";

export const Menu = () => {
  return (
    <header className="header-menu ">
      {/* =========================== TOP NAVBAR =========================== */}
      {TopNavbarMenu()}

      {/* ============================= NAVBAR ============================= */}
      {MainNavbarMenu()}
    </header>
  );
};
