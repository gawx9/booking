import LoginForm from "./LoginForm";
import { motion } from "framer-motion";
import RegisterForm from "./RegisterForm";

const Hero = ({
  openLoginForm,
  openRegisterForm,
  handleCloseLoginForm,
  handleCloseRegisterForm,
  handleOpenLoginForm,
}) => {
  return (
    <div
      className="mt-12 bg-cover bg-center relative py-10 text-center h-96 w-full"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* LoginForm */}
      <motion.div>
        {openLoginForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center"
          >
            <div className="w-full max-w-3xl px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <LoginForm
                openLoginForm={openLoginForm}
                handleCloseLoginForm={handleCloseLoginForm}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* RegisterForm */}
      <motion.div>
        {openRegisterForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center"
          >
            <div className="w-full max-w-3xl px-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <RegisterForm
                openRegisterForm={openRegisterForm}
                handleCloseRegisterForm={handleCloseRegisterForm}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto mt-16 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome to Our Jade Garden Beach Resort
        </h1>
        <p className="text-sm md:text-lg text-white mb-8">
          Discover amazing places and book your stay with ease. Your perfect
          getaway is just a click away!
        </p>

        <div>
          <button
            onClick={handleOpenLoginForm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
