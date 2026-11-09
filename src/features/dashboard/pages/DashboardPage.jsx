import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
