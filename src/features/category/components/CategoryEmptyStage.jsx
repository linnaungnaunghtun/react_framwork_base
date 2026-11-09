import { Link } from "react-router-dom";

const CategoryEmptyStage = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
      <td colSpan={6} className="px-6 py-4 text-center">
        There is no Category . <Link to="/dashboard/categorys-create" className=" text-primary-700 underline">create Category</Link>
      </td>
    </tr>
  );
};

export default CategoryEmptyStage;
