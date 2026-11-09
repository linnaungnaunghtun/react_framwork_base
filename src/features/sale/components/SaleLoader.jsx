const SaleLoader = () => {
  return (
    <tr>
      <td colSpan="6" className="px-6 py-4 text-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-500">Loading sales...</span>
        </div>
      </td>
    </tr>
  );
};

export default SaleLoader;
