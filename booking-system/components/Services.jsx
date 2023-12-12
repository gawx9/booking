import { servicesData } from "@/constants";
const Services = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white text-center p-12 flex items-center justify-center flex-col rounded shadow-md group hover:bg-orange-500 duration-300 border"
            >
              <div className="mb-4 border-2 p-2 text-orange-400 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-700 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm group-hover:text-white">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
