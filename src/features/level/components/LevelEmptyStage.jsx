import { Link } from "react-router-dom";

const LevelEmptyStage = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ">
      <td colSpan={6} className="px-6 py-4 text-center">
        There is no Level . <Link to="/dashboard/level-create" className=" text-primary-700 underline">create Level</Link>
      </td>
    </tr>
  );
};

export default LevelEmptyStage;
