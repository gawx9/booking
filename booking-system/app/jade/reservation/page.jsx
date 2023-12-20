"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layout/page";
import axios from "axios";
import Swal from "sweetalert2";
import ReservationModal from "@/modals/ReservationModal";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleView = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/reservations"
      );
      // console.log("Response Data", response.data);
      setReservations(response.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleDelete = async (reservationId) => {
    try {
      // Send a request to delete the reservation
      await axios.delete(
        `http://localhost:8080/api/reservations/${reservationId}`
      );

      // Update the state by filtering out the deleted reservation
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== reservationId
      );
      setReservations(updatedReservations);

      // Show a success message
      Swal.fire({
        icon: "success",
        title: "Reservation deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchTransaction();
    } catch (error) {
      // Handle the error (show an error message or log it)
      console.error("Error deleting reservation:", error);
      Swal.fire({
        icon: "error",
        title: "Error deleting reservation",
        text: "An error occurred while deleting the reservation.",
      });
    }
  };
  const handleConfirm = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId
        ? { ...reservation, status: "Confirmed" }
        : reservation
    );
    setReservations(updatedReservations);
  };

  const handleCancel = (reservationId) => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === reservationId
        ? { ...reservation, status: "Canceled" }
        : reservation
    );
    setReservations(updatedReservations);
  };

  return (
    <Layout>
      <div className="py-8 text-sm">
        <h1 className="text-3xl font-medium text-gray-700">
          Lists of Reservations
        </h1>

        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Check In</th>
              <th className="py-2 px-4 border-b">Check Out</th>

              <th className="py-2 px-4 border-b">Transaction Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {reservations.map((reservation, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b">{reservation.user.name}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(reservation.checkIn).toLocaleDateString("en-US")}
                </td>

                <td className="py-2 px-4 border-b">
                  {new Date(reservation.checkOut).toLocaleDateString("en-US")}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(reservation.createdAt).toLocaleDateString("en-US")}
                </td>
                <td className="py-2 px-4 border-b">
                  ${reservation.room.price}
                </td>
                <td className="py-2 px-4 border-b">{reservation.status}</td>
                <td className="py-2 px-4 border-b">
                  {reservation.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700 mr-2"
                        onClick={() => handleConfirm(reservation.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
                        onClick={() => handleCancel(reservation.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mr-2"
                    onClick={() => handleDelete(reservation._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2"
                    onClick={() => handleView(reservation)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the modal when a reservation is selected */}
      {selectedReservation && (
        <ReservationModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
};

export default Reservations;
