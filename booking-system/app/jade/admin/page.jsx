import Layout from "../layout/page";

const Admin = () => {
  return (
    <Layout>
      <div className="py-12 flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-medium text-gray-700">
            Administrator Panel: Welcome!
          </h1>
          <p className="bg-gray-100 p-4 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            similique vel voluptas libero aut quaerat veritatis at, natus harum
            dolorum quae beatae error voluptates aliquid?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-200 p-2 text-gray-700">Accomodation</div>
          <div className="bg-gray-200 p-2 text-gray-700">Reservation</div>
          <div className="bg-gray-200 p-2 text-gray-700">Users</div>
        </div>

        <p className="text-gray-800">&copy; 2023 Jade Resort</p>
      </div>
    </Layout>
  );
};

export default Admin;
