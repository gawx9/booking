const ReservationModal = ({ reservation, onClose }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center  pt-4 px-4 pb-20  sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {/* Modal panel */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="w-full max-w-3xl align-bottom bg-white rounded-lg  transform transition-all">
          {/* Modal content with reservation details */}
          <div className="bg-white p-12">
            <h2 className="text-2xl font-medium py-8">Jade Garden Resort</h2>

            <div className="md:flex items-center justify-between  text-sm text-gray-400 ">
              <div>
                <p className="">From</p>
                <p>Jade Garden Resort</p>
                <p>Guanzon Street</p>
                <p>
                  Email: <span>example@gmail.com</span>
                </p>
              </div>

              <div className="py-10 md:py-0">
                <p>To</p>
                <p>{reservation.user.name}</p>
                <p>{reservation.user.email}</p>
              </div>
            </div>

            <div style={{ overflowX: "auto" }} className=" whitespace-nowrap">
              <table className="w-full bg-white border border-gray-300 mt-4 text-sm">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Room</th>
                    <th className="py-2 px-4 border-b">Check In</th>
                    <th className="py-2 px-4 border-b">Check Out</th>

                    <th className="py-2 px-4 border-b">Transaction Date</th>
                    <th className="py-2 px-4 border-b">Total Price</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td className="py-2 px-4 border-b">
                      {reservation.room.title}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {new Date(reservation.checkIn).toLocaleDateString(
                        "en-US"
                      )}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {new Date(reservation.checkOut).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(reservation.createdAt).toLocaleDateString(
                        "en-US"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${reservation.room.price}
                    </td>
                    <td className="py-2 px-4 border-b">{reservation.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal footer with buttons */}
          <div className="bg-gray-100 p-4 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              onClick={() => window.print()}
            >
              Print
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
