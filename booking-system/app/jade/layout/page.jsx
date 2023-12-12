"use client";
import React from "react";
import { nav_links } from "@/constants/admin";
import Link from "next/link";

import Swal from "sweetalert2";

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
  return (
    <div>
      <div className="w-full bg-gray-500 flex items-center">
        <ul className="flex items-center">
          {nav_links.map((link, i) => (
            <Link href={link.path} key={i}>
              <li className="px-10 py-4 cursor-pointer text-white">
                {link.title}
              </li>
            </Link>
          ))}

          <li className="text-white px-10 py-4 cursor-pointer">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {children}
    </div>
  );
};

export default Layout;
