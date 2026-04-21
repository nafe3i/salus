import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import doctorService from "../../services/doctorService";

export default function DoctorDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const result = await doctorService.getById(id);
      if (result.success) {
        setDoctor(result.data.data || result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load doctor details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Doctor Details</h1>
              <button
                onClick={() => navigate("/doctors")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                ← Back to Doctors
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error || "Doctor not found"}
          </div>
        </main>
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
              <h1 className="text-3xl font-bold text-gray-900">Doctor Details</h1>
              <p className="mt-1 text-sm text-gray-600">
                Complete information about the healthcare professional
              </p>
            </div>
            <button
              onClick={() => navigate("/doctors")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ← Back to Doctors
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">
                  {doctor.name ? doctor.name.charAt(0).toUpperCase() : 'D'}
                </span>
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Dr. {doctor.name || 'Unknown'}
                </h3>
                <p className="text-lg text-gray-600">
                  {doctor.specialty || 'General Practitioner'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.email || 'Not provided'}
                </dd>
              </div>
              
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.phone || 'Not provided'}
                </dd>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  City
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.city || 'Not provided'}
                </dd>
              </div>
              
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.address || 'Not provided'}
                </dd>
              </div>
              
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Experience
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.experience || 'Not specified'}
                </dd>
              </div>
              
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Education
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {doctor.education || 'Not provided'}
                </dd>
              </div>
              
              {doctor.bio && (
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Biography
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {doctor.bio}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/appointments/add")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
              >
                📅 Book Appointment
              </button>
              <button
                onClick={() => window.location.href = `mailto:${doctor.email}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                disabled={!doctor.email}
              >
                📧 Send Email
              </button>
              <button
                onClick={() => window.location.href = `tel:${doctor.phone}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors"
                disabled={!doctor.phone}
              >
                📞 Call
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
