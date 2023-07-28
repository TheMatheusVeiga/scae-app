import React from "react";
import FunctionalDashboard from "./components/Dashboard/FunctionalDashboard";
import Base from "./content/Base";
import Container from "./content/Container";
import AppNavbar from "../app/components/AppNavbar/AppNavbar";

export default function Dashboard() {
  return (
    <>
      <Base>
        <Container>
          {/* -------------------------- Navbar */}
          <AppNavbar />
          {/* -------------------------- Dashboard Logic */}
          <FunctionalDashboard />
        </Container>
      </Base>
    </>
  );
}
