"use client";
import React, { useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        formData
      );

      const { token } = response.data;

      localStorage.setItem("token", token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/jade/admin");
      // console.log("Logged in successfully");
    } catch (error) {
      // console.log("Authentication error:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <div className="flex items-center pb-5 gap-3">
        <MdAdminPanelSettings size={25} />
        <h1 className="font-bold text-3xl">Admin</h1>
      </div>
      <div className="w-full max-w-xl border-2 bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
