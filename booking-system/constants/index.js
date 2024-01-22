import Slide1 from "/public/slide1.jpg";
import Slide2 from "/public/slide2.jpg";
import Slide3 from "/public/slide3.jpg";
import Slide4 from "/public/slide4.jpg";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBed,
  FaUtensils,
  FaSpa,
  FaGamepad,
  FaBirthdayCake,
  FaDumbbell,
} from "react-icons/fa";
export const nav_bar = [
  {
    title: "Home",
    url: "#",
  },
  {
    title: "About",
    url: "#about",
  },
  {
    title: "Contact Us",
    url: "#contact",
  },
];

export const slides = [
  {
    img: Slide1,
  },
  {
    img: Slide2,
  },
  {
    img: Slide3,
  },
  {
    img: Slide4,
  },
];

export const socials = [
  {
    icon: <FaFacebook size={25} />,
  },
  {
    icon: <FaTwitter size={25} />,
  },
  {
    icon: <FaInstagram size={25} />,
  },
];

// Sample data
export const servicesData = [
  {
    title: "Room and Apartments",
    description: "Luxurious rooms and apartments for a comfortable stay",
    icon: <FaBed size={36} />,
  },
  {
    title: "Food And Restaurant",
    description: "Delicious cuisine served in our top-notch restaurant",
    icon: <FaUtensils size={36} />,
  },
  {
    title: "Spa and Fitness",
    description:
      "Relaxing spa treatments and state-of-the-art fitness facilities",
    icon: <FaSpa size={36} />,
  },
  {
    title: "Sports and Gaming",
    description: "Engage in various sports and gaming activities",
    icon: <FaGamepad size={36} />,
  },
  {
    title: "Event and Party",
    description: "Host your events and parties in our versatile spaces",
    icon: <FaBirthdayCake size={36} />,
  },
  {
    title: "Gym and Yoga",
    description: "Stay fit with our well-equipped gym and yoga sessions",
    icon: <FaDumbbell size={36} />,
  },
];

export const bookings = [
  {
    id: 1,
    roomType: "Standard Room",
    images: [
      "https://hips.hearstapps.com/hmg-prod/images/cute-room-ideas-1677096334.png",
      "https://www.thespruce.com/thmb/vf_MEDifLRzzmQNjMyUDR1FGA14=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/tips-for-decorating-a-beautiful-bedroom-1976169-hero-e960fbb8311c4b9b875a1813962d34eb.jpg",
    ],
    description: "A cozy room with basic amenities.",
    price: 100,
  },
  {
    id: 2,
    roomType: "Deluxe Suite",
    images: [
      "https://i.pinimg.com/736x/ca/48/f7/ca48f772ce77c9b9d1ed5840be95a920.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTggKCR1qXn8NtdAuB-yqg1wmKAAN-WLJvBJw&usqp=CAU",
    ],
    description: "Luxurious suite with a beautiful view.",
    price: 200,
  },
  {
    id: 3,
    roomType: "Sample",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTggKCR1qXn8NtdAuB-yqg1wmKAAN-WLJvBJw&usqp=CAU",
    ],
    description: "Luxurious suite with a beautiful view.",
    price: 100,
  },
  {
    id: 4,
    roomType: "Sample Room",
    images: [
      "https://www.thespruce.com/thmb/vf_MEDifLRzzmQNjMyUDR1FGA14=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/tips-for-decorating-a-beautiful-bedroom-1976169-hero-e960fbb8311c4b9b875a1813962d34eb.jpg",
    ],
    description: "A cozy room with basic amenities.",
    price: 150,
  },
];
