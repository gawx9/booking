"use client";
import React, { useState } from "react";
import { nav_bar } from "@/constants";
import { MdOutlineMenu, MdClose } from "react-icons/md";

const NavBar = ({ handleOpenLoginForm, handleOpenRegisterForm }) => {
  const [nav, setNav] = useState(false);
  const handleClickNav = () => {
    setNav(!nav);
  };

  const handleLinkClick = (url) => {
    window.location.href = url;
    setNav(false);
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-bold text-4xl">
        Ja<span className="text-blue-500">de</span>
      </h1>
      <ul className="hidden md:flex items-center">
        {nav_bar.map((link, i) => (
          <a href={link.url} key={i}>
            <li className="px-5 cursor-pointer font-medium">{link.title}</li>
          </a>
        ))}
      </ul>

      <div className="hidden md:block">
        <button
          onClick={handleOpenLoginForm}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Sign In
        </button>
        <button
          onClick={handleOpenRegisterForm}
          className="bg-blue-500 text-white px-4 py-1 rounded ml-4"
        >
          Register
        </button>
      </div>

      <div
        onClick={handleClickNav}
        className="block md:hidden cursor-pointer z-50"
      >
        {!nav ? <MdOutlineMenu size={30} /> : <MdClose size={30} />}
      </div>

      <ul
        className={
          nav
            ? "z-50 flex md:hidden gap-5 items-center justify-center flex-col fixed left-0 top-0 w-[80%] h-full bg-orange-500 text-black ease-in-out duration-500"
            : "z-50 flex md:hidden gap-5 items-center justify-center flex-col fixed left-[-100%] top-0 w-[80%] h-full bg-orange-500 text-black ease-in-out duration-500"
        }
      >
        {nav_bar.map((link, i) => (
          <li
            key={i}
            onClick={() => handleLinkClick(link.url)}
            className="px-5 cursor-pointer font-medium text-white text-2xl"
          >
            {link.title}
          </li>
        ))}

        <div className="flex flex-col gap-4">
          <button
            onClick={handleOpenLoginForm}
            className="border-2 border-gray-200 text-white px-5 text-2xl py-1 rounded"
          >
            Sign In
          </button>
          <button
            onClick={handleOpenRegisterForm}
            className="border-2 border-gray-200 text-white px-5 text-2xl py-1 rounded"
          >
            Register
          </button>
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
