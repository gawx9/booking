const ContactUs = () => {
  return (
    <section id="contact" className="bg-gray-100 p-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-700 mb-4">
              We'd love to hear from you. If you have any questions or
              inquiries, feel free to reach out to us.
            </p>
            <p className="text-gray-700 mb-4">Email: info@example.com</p>
            <p className="text-gray-700">Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Us</h3>
            <p className="text-gray-700 mb-4">
              Stop by our office during business hours. We look forward to
              meeting you!
            </p>
            <p className="text-gray-700">123 Main Street</p>
            <p className="text-gray-700">Cityville, State, 12345</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
