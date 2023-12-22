"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
const RegisterForm = ({ handleCloseRegisterForm, setOpenRegisterForm }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", newUser);

      setNewUser({
        name: "",
        email: "",
        password: "",
      });

      Swal.fire({
        icon: "success",
        title: "Register Success",
        text: "Sucess!",
        showConfirmButton: false,
        timer: 1500,
      });

      setOpenRegisterForm(false);
    } catch (error) {
      console.log("Error adding user", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Registration Failed",
        showConfirmButton: true,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  return (
    <div className="bg-white p-6 rounded-md shadow-md relative max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div
        onClick={handleCloseRegisterForm}
        className="absolute right-4 top-0 py-4 cursor-pointer"
      >
        <MdClose size={25} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="text-start block text-gray-700 font-medium"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="text-start block text-gray-700 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="text-start block text-gray-700 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
