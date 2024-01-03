// Import necessary libraries
"use client";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

// Define the BookingModal component
const BookingModal = ({ handleCloseModal, roomId }) => {
  // State for check-in and check-out dates
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  // Get the current date
  const currentDate = new Date();

  // Function to handle the booking process
  const handleBookNow = async () => {
    try {
      // Check if a token is available
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      // Prepare reservation data
      const reservationData = {
        roomId,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
      };

      // Make a reservation request to the server
      const response = await axios.post(
        "http://localhost:8080/api/reservation",
        reservationData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Display a confirmation dialog before closing the modal
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, book it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Display a success message if the user confirms the action
          Swal.fire({
            title: "Booked!",
            text: "Your reservation has been confirmed.",
            icon: "success",
          });

          // Close the modal after success
          handleCloseModal();
        }
      });

      // console.log(response.data);
    } catch (error) {
      console.error("Error booking reservation:", error);
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
            minDate={currentDate} // Set minDate to the current date
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
            minDate={checkInDate || currentDate} // Set minDate based on checkInDate or current date
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
