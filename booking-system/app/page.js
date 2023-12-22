"use client";
import { Footer, Hero, NavBar } from "@/components";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Services from "@/components/Services";
import { useState } from "react";

export default function Home() {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);

  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
  };

  const handleOpenRegisterForm = () => {
    setOpenRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setOpenRegisterForm(false);
  };
  return (
    <div>
      <NavBar
        handleOpenLoginForm={handleOpenLoginForm}
        handleOpenRegisterForm={handleOpenRegisterForm}
      />
      <Hero
        handleOpenLoginForm={handleOpenLoginForm}
        openLoginForm={openLoginForm}
        handleCloseLoginForm={handleCloseLoginForm}
        openRegisterForm={openRegisterForm}
        handleCloseRegisterForm={handleCloseRegisterForm}
        setOpenRegisterForm={setOpenRegisterForm}
      />
      <About />
      <Services />
      <ContactUs />
      <Footer />
    </div>
  );
}
