import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import appointmentService from "../../services/appointmentService";

export default function AppointmentsList() {
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const result = await appointmentService.getAll();
      if (result.success) {
        // Gérer les différentes structures de réponse possibles
        const appointmentsData = result.data.data || result.data || [];
        setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    try {
      const result = await appointmentService.delete(id);
      if (result.success) {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to delete appointment");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your medical appointments
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={() => navigate("/appointments/add")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                + Add Appointment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No appointments scheduled yet
            </h3>
            <p className="text-gray-600 mb-4">
              Book your first medical appointment to get started.
            </p>
            <button
              onClick={() => navigate("/appointments/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {appointment.doctor_name || 'Doctor Appointment'}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status || 'pending'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                📅 {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'No date'}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                ⏰ {appointment.time || 'No time'}
                              </p>
                              {appointment.notes && (
                                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  📝 {appointment.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex space-x-2">
                        <button
                          onClick={() => navigate(`/appointments/edit/${appointment.id}`)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
