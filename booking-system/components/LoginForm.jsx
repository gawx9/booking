"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginForm = ({ handleCloseLoginForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

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
        "https://jade-ka0u.onrender.com/api/login",
        formData
      );

      const { token } = response.data;

      localStorage.setItem("token", token);
      // console.log(token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/booking");
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div
          onClick={handleCloseLoginForm}
          className="absolute right-4 top-0 py-4 cursor-pointer"
        >
          <MdClose size={25} />
        </div>

        <form onSubmit={handleSubmit} className="form">
          <p className="form-title">Sign in to your account</p>
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
            <span></span>
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>
          <button onClick={handleSubmit} type="submit" className="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
