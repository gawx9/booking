"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layout/page";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Image from "next/image";
const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [newRoom, setNewRoom] = useState({
    title: "",
    description: "",
    accommodation: "",
    person: "",
    price: "",
    image: null,
  });

  const handleDelete = async (roomId) => {
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
        // Make API call to delete the room
        await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);

        // Display a success message if the user confirms the action
        await Swal.fire({
          title: "Deleted!",
          text: "Room deleted successfully",
          icon: "success",
        });

        // Update state by removing the deleted room
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));

        // Fetch updated rooms
        fetchRooms();
      } else {
        // Handle case where user cancels the deletion
        Swal.fire("Cancelled", "Room deletion cancelled", "info");
      }
    } catch (error) {
      console.error("Error deleting a room:", error);
      // Display an error message
      Swal.fire("Error", "An error occurred while deleting the room", "error");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms");
      // console.log("Response Data after adding a room:", response.data);
      // console.log(response.data);
      setRooms(response.data);
    } catch (error) {
      console.log("Error fetching rooms", error);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newRoom.title);
      formData.append("description", newRoom.description);
      formData.append("accommodation", newRoom.accommodation);
      formData.append("person", newRoom.person);
      formData.append("price", newRoom.price);
      formData.append("image", newRoom.image);

      const response = await axios.post(
        "http://localhost:8080/api/rooms",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        // Assuming response.data contains the room details
        setRooms((prevRooms) => [...prevRooms, response.data]);
        handleCloseModal();
        setError("");
        fetchRooms();
      } else {
        console.error(
          "Failed to add room. Unexpected status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error adding room", error);
      setError(error.response.data.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        image: files[0],
      }));
    } else {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        [name]: value,
      }));
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
    setNewRoom({
      title: "",
      description: "",
      accommodation: "",
      person: "",
      price: "",
      image: null,
    });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Layout>
      <div className="py-8 text-sm whitespace-nowrap">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium text-gray-700">Lists of Rooms</h1>
          <button
            className="bg-blue-500 text-white text-sm px-4 rounded"
            onClick={handleShowModal}
          >
            Add Room
          </button>
        </div>
        <div className="overflow-x-auto">
          {rooms.length === 0 ? (
            <p className="text-center text-red-500 py-12">
              {" "}
              No Available rooms right now
            </p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 mt-4">
              <thead className="text-sm">
                <tr>
                  <th className="py-2 px-4 border-b">Image</th>
                  <th className="py-2 px-4 border-b">Title</th>
                  <th className="py-2 px-4 border-b">Accommodation</th>
                  <th className="py-2 px-4 border-b">Persons</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {rooms.map((room, i) => (
                  <tr
                    key={i}
                    className={`${i % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
                  >
                    <td className="py-2 px-4 border-b flex items-center justify-center">
                      <Image
                        src={`http://localhost:8080/${room.image}`}
                        alt={room.title}
                        width={10}
                        height={10}
                        // className="h-10 w-10 object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{room.title}</td>
                    <td className="py-2 px-4 border-b">{room.accommodation}</td>
                    <td className="py-2 px-4 border-b">{room.person}</td>
                    <td className="py-2 px-4 border-b">
                      ₱ {""}
                      {room.price}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(room._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Room</h2>
            <form onSubmit={handleAddRoom}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newRoom.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newRoom.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="accommodation"
                  className="block text-gray-700 font-medium"
                >
                  Accommodation
                </label>
                <input
                  type="text"
                  name="accommodation"
                  value={newRoom.accommodation}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="person"
                  className="block text-gray-700 font-medium"
                >
                  Persons
                </label>
                <input
                  type="text"
                  name="person"
                  value={newRoom.person}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-medium"
                >
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={newRoom.price}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  accept="image/*"
                />
              </div>

              {error && (
                <div className="p-2 bg-slate-100 mb-4">
                  {error.split(", ").map((errorMessage, index) => (
                    <p key={index} className="text-red-500 text-sm py-2">
                      {errorMessage}
                    </p>
                  ))}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Rooms;
