"use client";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { nav_links } from "@/constants/admin";
import Link from "next/link";
import Swal from "sweetalert2";
import Access from "@/modals/Access";
import { Toaster } from "react-hot-toast";

export const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout",
  }).then((result) => {
    if (result.isConfirmed) {
      setTimeout(() => {
        window.location.href = "/jade/login";
        localStorage.removeItem("token");
      }, 1500);
    }
  });
};

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [haveToken, setHaveToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setHaveToken(token);
    // console.log(token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return haveToken ? (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <div className="bg-gray-500">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <h1 className="font-bold text-3xl text-white">
              Ja<span className="text-blue-400">De</span>
            </h1>
            <ul className="hidden md:flex items-center">
              {nav_links.map((link, i) => (
                <Link href={link.path} key={i}>
                  <li className="px-4 py-2 cursor-pointer text-white">
                    {link.title}
                  </li>
                </Link>
              ))}

              <li
                className="px-4 py-2 cursor-pointer text-white"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* Responsive menu icon for mobile devices */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? (
              <FiX size={30} color="white" />
            ) : (
              <FiMenu size={30} color="white" />
            )}
          </div>
        </div>

        {/* Responsive menu for mobile devices */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center">
              {nav_links.map((link, i) => (
                <Link href={link.path} key={i}>
                  <li className="px-4 py-2 cursor-pointer text-white">
                    {link.title}
                  </li>
                </Link>
              ))}

              <li
                className="px-4 py-2 cursor-pointer text-white"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {children}
    </div>
  ) : (
    <Access />
  );
};

export default Layout;
