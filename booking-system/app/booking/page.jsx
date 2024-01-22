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
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingList, setBookingList] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isBookingListOpen, setIsBookingListOpen] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);

  const router = useRouter();
  const notify = () => {
    if (!notificationShown) {
      toast.success("Your booking has been approved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Set the notificationShown state to true to prevent showing the notification again
      setNotificationShown(true);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to the admin panel if the user is no token in local storage
      router.push("/");
    }
    // console.log(token);
  }, [router]);
  const handleOpenModal = ({ roomId }) => {
    setIsModalOpen(true);
    setRoomId(roomId); // Set roomId in state
  };

  const handleBookingsClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const response = await axios.get(
        "https://jade-ka0u.onrender.com/api/reservations-user",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setBookingList(response.data);
      // console.log("Fetching bookings", response.data);
      setBookingList(response.data);
      setIsBookingListOpen(true);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const handleCloseBookingList = () => {
    setIsBookingListOpen(false);
    fetchAllBookings();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoomId(null);
  };
  // Function for handling logout
  const handleLogoutClick = () => {
    handleLogout();
  };

  // Fetch bookings data from the API when the component mounts
  const fetchAllBookings = async () => {
    try {
      const response = await axios.get(
        "https://jade-ka0u.onrender.com/api/rooms"
      );

      setBookings(response.data);
      // console.log(response.data);

      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const { name } = decodedToken;
        setUserName(name);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
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
            <Option setOpen={setOpen} Icon={FiUser} text={userName} />
            <Option
              setOpen={setOpen}
              Icon={TbBrandBooking}
              text="Bookings"
              handleBookingsClick={handleBookingsClick}
            />
            <Option
              setOpen={setOpen}
              Icon={FiLogOut}
              text="Log Out"
              handleLogoutClick={handleLogoutClick}
            />
          </motion.ul>
        </motion.div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center pt-24 text-red-500 text-md">
          No Rooms Available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, i) => (
            <div key={i} className="bg-white p-4 rounded-md shadow-md">
              {booking.image && ( // Conditionally render the image if 'image' property exists
                <Image
                  src={`https://jade-ka0u.onrender.com/${booking.image}`}
                  alt={`Room ${booking.roomType}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                  height={40}
                  width={500}
                />
              )}
              <h3 className="text-xl font-bold mb-2">{booking.title}</h3>
              <p className="text-gray-600 mb-4">{booking.description}</p>
              <p className="text-lg font-bold text-blue-500">
                ${booking.price}/night
              </p>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleOpenModal({ roomId: booking._id })}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <BookingModal
          roomId={roomId} // Pass the selected room ID to BookingModal
          handleCloseModal={handleCloseModal}
        />
      )}

      {isBookingListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-md">
            <h2 className="font-medium text-3xl mb-2 text-gray-500">
              List Booked Rooms
            </h2>
            <div className="overflow-x-auto text-sm whitespace-nowrap">
              {bookingList.length === null ? (
                <p>Loading....</p>
              ) : bookingList.length === 0 ? (
                <p className="text-center py-5">No Lists of Bookings</p>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Room
                      </th>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Check In
                      </th>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Check Out
                      </th>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Price
                      </th>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Person
                      </th>
                      <th className="py-2 px-4 border-b font-medium text-md text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center text-sm ">
                    {bookingList.map((booking, i) => (
                      <tr
                        className={`${
                          i % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }`}
                        key={i}
                      >
                        <td className="py-2 px-4 border-b">
                          {booking.room.title}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(booking.checkIn).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {new Date(booking.checkOut).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">
                          ${booking.room.price}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {booking.room.person}
                        </td>
                        <td
                          className={`py-2 px-4 border-b ${
                            booking.status === "Pending"
                              ? "text-yellow-500"
                              : booking.status === "Approved"
                              ? "text-green-500"
                              : booking.status === "Canceled"
                              ? "text-red-500"
                              : ""
                          }`}
                        >
                          {booking.status}
                        </td>

                        <td>{booking.status === "Approved" && notify()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded mt-5"
              onClick={handleCloseBookingList}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  handleLogoutClick,
  handleBookingsClick,
}) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        if (text === "Log Out") {
          handleLogoutClick();
        } else if (text === "Bookings") {
          handleBookingsClick();
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
export default Page;
