import { socials } from "@/constants";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 Your Company</p>

        <div className="flex space-x-4">
          {socials.map((icon, i) => (
            <div key={i}>{icon.icon}</div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
