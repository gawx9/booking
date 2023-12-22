"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layout/page";
import axios from "axios";
import Swal from "sweetalert2";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      // console.log("Response Data", response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      // Display a confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // Make API call to delete the user
        await axios.delete(`http://localhost:8080/api/users/${userId}`);

        // Display a success message if the user confirms the action
        await Swal.fire({
          title: "Deleted!",
          text: "Room deleted successfully",
          icon: "success",
        });

        // Update state by removing the deleted user
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );

        // Fetch updated users
        fetchUsers();
      } else {
        // Handle case where user cancels the deletion
        Swal.fire("Cancelled", "Room deletion cancelled", "info");
      }
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  const handleSaveUser = async () => {
    try {
      await axios.post("http://localhost:8080/api/register", newUser);

      setIsModalOpen(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
      });

      fetchUsers();
    } catch (error) {
      console.log("Error adding user", error);
    }
  };

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <Layout>
      <div className="py-8 text-sm">
        <h1 className="text-3xl font-medium text-gray-700">List of Users</h1>

        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddUser}
          >
            Add User
          </button>
        </div>
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>

                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user, i) => (
                <tr
                  key={i}
                  className={`${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
                >
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>

                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="border rounded-md w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="border rounded-md w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="border rounded-md w-full p-2"
              />
            </label>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                onClick={handleSaveUser}
              >
                Save
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Users;
