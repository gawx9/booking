import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";

const BookingModal = ({ handleCloseModal, roomId }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  console.log(roomId);

  const token = localStorage.getItem("token");
  console.log(token);
  const handleBookNow = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authorization token not found");
        // Handle unauthorized access, redirect, or show an error message
        return;
      }

      // Make a request to the reservation API with the authorization header
      const response = await axios.post(
        "http://localhost:8080/api/reservation",
        {
          roomId,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Reservation requested successfully:", response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Error requesting reservation:", error);

      // Check if the error response contains a message
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      // Display the error message to the user (you can implement your own error handling UI)
      alert(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md relative w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Choose Dates</h2>

        <div
          onClick={handleCloseModal}
          className="absolute right-4 top-0 py-4 cursor-pointer"
        >
          <MdClose size={25} />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="checkIn">Check-In Date:</label>
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            className="p-2 border border-gray-300 rounded-md w-full"
            dateFormat="dd/MM/yyyy"
            placeholderText="Check In"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="checkOut">Check-Out Date:</label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate}
            className="p-2 border border-gray-300 rounded-md w-full"
            dateFormat="dd/MM/yyyy"
            placeholderText="Check Out"
          />
        </div>
        <button
          onClick={handleBookNow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
