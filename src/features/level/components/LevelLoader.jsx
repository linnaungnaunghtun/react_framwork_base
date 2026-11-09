import { useSearchParams } from "react-router-dom";

const LevelLoader = () => {
  const [params, setParams] = useSearchParams();
  const currentLimit = params.get("limit") ?? 5;

  return [...Array(Number(currentLimit))].map((_, i) => (
    <tr
      key={i}
      className="animate-pulse odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-8"></div>
      </td>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-stone-900 whitespace-nowrap dark:text-white"
      >
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-48"></div>
      </th>
      <td className="px-6 py-3 ">
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-16"></div>
      </td>
      <td className="px-6 py-3 text-end">
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-20 ml-auto"></div>
        <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-16 mt-2 ml-auto"></div>
      </td>
  
      <td className="px-6 py-3 text-end">
        <div className="inline-flex">
          <div className="h-8 w-8 bg-gray-200 rounded dark:bg-gray-700 mr-2"></div>
          <div className="h-8 w-8 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
      </td>
    </tr>
  ));
};

export default LevelLoader;
