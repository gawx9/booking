"use client";
import BookingModal from "@/modals/BookingModal";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  itemVariants,
  actionIconVariants,
  iconVariants,
  wrapperVariants,
} from "@/constants/motion";
import { FiUser, FiChevronDown, FiLogOut } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { handleLogout } from "@/utils/logout";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [userName, setUserName] = useState("");

  const handleOpenModal = ({ roomId }) => {
    setIsModalOpen(true);
    setRoomId(roomId); // Set roomId in state
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoomId(null);
  };
  // Function for handling logout
  const handleLogoutClick = () => {
    handleLogout();
  };
  useEffect(() => {
    // Fetch bookings data from the API when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/rooms");

        setBookings(response.data);

        const token = localStorage.getItem("token");

        // Decode the token to get user information
        if (token) {
          const decodedToken = jwtDecode(token);
          const { name } = decodedToken; // Assuming 'name' exists in your token payload
          setUserName(name); // Set the user's name in state
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);
  return (
    <div className="container mx-auto mt-8">
      <div className="flex items-center justify-between bg-white">
        <h2 className="text-lg md:text-3xl font-bold">Available Bookings</h2>
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <div
            onClick={() => setOpen((pv) => !pv)}
            className="flex items-center gap-4 bg-gray-200 cursor-pointer px-4 py-2 rounded"
          >
            <FiUser />
            <span className="hidden md:block">{userName}</span>
            <motion.span variants={iconVariants}>
              <FiChevronDown size={25} />
            </motion.span>
          </div>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
            <Option setOpen={setOpen} Icon={TbBrandBooking} text="Bookings" />
            <Option
              setOpen={setOpen}
              Icon={FiLogOut}
              text="Log Out"
              handleLogoutClick={handleLogoutClick}
            />
          </motion.ul>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookings.map((booking, i) => (
          <div key={i} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={`http://localhost:8080/${booking.image}`}
              alt={`Room ${booking.roomType}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{booking.roomType}</h3>
            <p className="text-gray-600 mb-4">{booking.description}</p>
            <p className="text-lg font-bold text-blue-500">
              ${booking.price}/night
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleOpenModal({ roomId: booking._id })} // Pass the room ID as an object
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <BookingModal
          roomId={roomId} // Pass the selected room ID to BookingModal
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

const Option = ({ text, Icon, setOpen, handleLogoutClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        if (text === "Log Out") {
          handleLogoutClick();
        }
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};
export default page;
