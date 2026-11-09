import { Link } from "react-router-dom";

const ModuleButton = ({ name, description, icon, url, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700",
    indigo:
      "bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700",
    green: "bg-green-50 hover:bg-green-100 border-green-200 text-green-700",
    orange:
      "bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700",
    purple:
      "bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700",
    teal: "bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-700",
    yellow:
      "bg-yellow-50 hover:bg-yellow-100 border-yellow-200 text-yellow-700",
    gray: "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
    teal: "text-teal-600",
    yellow: "text-yellow-600",
    gray: "text-gray-600",
  };

  return (
    <Link
      to={url}
      className={`group block p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${colorClasses[color]}`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`p-3 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300 ${iconColorClasses[color]}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <p className="text-sm opacity-75">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ModuleButton;
