import LogoutButton from "../../../components/LogoutButton";
import useUserStore from "../../../stores/useUserStore";

const Header = () => {
  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <header className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {import.meta.env.VITE_APP_NAME}
          </h1>
          <p className="text-gray-600 text-lg">
            POS, E-commerce, CRM Admin Panel
          </p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <img
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
          <div className="border-l border-gray-300 pl-4">
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
