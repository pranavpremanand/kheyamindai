import React from "react";
import Header from "./Components/Website/Header";
import Footer from "./Components/Website/Footer";
import { Outlet } from "react-router-dom";
import LandingHeader from "./Components/LandingPage/LandingHeader";
import LandingFooter from "./Components/LandingPage/LandingFooter";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export const LandingPageLayout = () => {
  return (
    <>
      <LandingHeader />
      <main>
        <Outlet />
      </main>
      <LandingFooter />
    </>
  );
};
