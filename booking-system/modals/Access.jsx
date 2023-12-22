import { IoMdAlert } from "react-icons/io";

const Access = () => {
  return (
    <div className="flex items-center px-12 py-2 rounded text-white gap-2 max-w-xl mx-auto bg-red-500">
      <IoMdAlert size={30} />{" "}
      <p className="">You Don't have access to this site</p>
    </div>
  );
};

export default Access;
