import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import symptomService from "../../services/symptomService";
import doctorService from "../../services/doctorService";
import appointmentService from "../../services/appointmentService";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    symptoms: 0,
    doctors: 0,
    appointments: 0,
    aiAdvice: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all data in parallel
      const [symptomsResult, doctorsResult, appointmentsResult] = await Promise.all([
        symptomService.getAll(),
        doctorService.getAll(),
        appointmentService.getAll()
      ]);

      const symptomsData = symptomsResult.success ? 
        (symptomsResult.data?.data || symptomsResult.data || []) : [];
      
      const doctorsData = doctorsResult.success ? 
        (doctorsResult.data?.data || doctorsResult.data || []) : [];
      
      const appointmentsData = appointmentsResult.success ? 
        (appointmentsResult.data?.data || appointmentsResult.data || []) : [];

      setStats({
        symptoms: Array.isArray(symptomsData) ? symptomsData.length : 0,
        doctors: Array.isArray(doctorsData) ? doctorsData.length : 0,
        appointments: Array.isArray(appointmentsData) ? appointmentsData.length : 0,
        aiAdvice: 0 // TODO: Implement AI advice history when available
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Salus Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user?.name || "User"}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">0</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Symptoms
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {loading ? "..." : stats.symptoms}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button 
                  onClick={() => navigate("/symptoms")}
                  className="font-medium text-blue-700 hover:text-blue-600"
                >
                  View all
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">0</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Doctors
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {loading ? "..." : stats.doctors}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button 
                  onClick={() => navigate("/doctors")}
                  className="font-medium text-blue-700 hover:text-blue-600"
                >
                  Find doctors
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">0</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Appointments
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {loading ? "..." : stats.appointments}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button 
                  onClick={() => navigate("/appointments")}
                  className="font-medium text-blue-700 hover:text-blue-600"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">0</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      AI Advice
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {loading ? "..." : stats.aiAdvice}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button 
                  onClick={() => navigate("/ai-advice")}
                  className="font-medium text-blue-700 hover:text-blue-600"
                >
                  Get advice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/symptoms")}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                🤒 Add Symptom
              </button>
              <button
                onClick={() => navigate("/doctors")}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                👨‍⚕️ Find Doctors
              </button>
              <button
                onClick={() => navigate("/appointments")}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                📅 Book Appointment
              </button>
              <button
                onClick={() => navigate("/ai-advice")}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                🤖 Get AI Advice
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
