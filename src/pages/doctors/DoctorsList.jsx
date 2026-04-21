import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import doctorService from "../../services/doctorService";

export default function DoctorsList() {
  const navigate = useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchForm, setSearchForm] = useState({
    city: "",
    specialty: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const result = await doctorService.getAll();
      if (result.success) {
        // Gérer différentes structures de réponse Laravel
        let doctorsData = [];
        
        if (result.data && Array.isArray(result.data)) {
          doctorsData = result.data;
        } else if (result.data && result.data.data && Array.isArray(result.data.data)) {
          doctorsData = result.data.data;
        } else if (result.data && Array.isArray(result.data.doctors)) {
          doctorsData = result.data.doctors;
        } else {
          console.log('API Response:', result.data);
          doctorsData = [];
        }
        
        setDoctors(doctorsData);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Fetch doctors error:', err);
      setError("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await doctorService.search(searchForm);
      if (result.success) {
        // Gérer différentes structures de réponse Laravel
        let doctorsData = [];
        
        if (result.data && Array.isArray(result.data)) {
          doctorsData = result.data;
        } else if (result.data && result.data.data && Array.isArray(result.data.data)) {
          doctorsData = result.data.data;
        } else if (result.data && Array.isArray(result.data.doctors)) {
          doctorsData = result.data.doctors;
        } else {
          doctorsData = [];
        }
        
        setDoctors(doctorsData);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to search doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchForm({ city: "", specialty: "" });
    fetchDoctors();
  };

  const handleSearchChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value,
    });
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
              <h1 className="text-3xl font-bold text-gray-900">Find Doctors</h1>
              <p className="mt-1 text-sm text-gray-600">
                Search and connect with healthcare professionals
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Paris, Lyon, Marseille"
                  value={searchForm.city}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                  Specialty
                </label>
                <input
                  id="specialty"
                  name="specialty"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Cardiologist, Dermatologist"
                  value={searchForm.specialty}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                🔍 Search
              </button>
              <button
                type="button"
                onClick={handleClearSearch}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {doctors.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">👨‍⚕️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {doctor.name ? doctor.name.charAt(0).toUpperCase() : 'D'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Dr. {doctor.name || 'Unknown'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty || 'General Practitioner'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {doctor.city && (
                      <p className="flex items-center">
                        📍 {doctor.city}
                      </p>
                    )}
                    {doctor.email && (
                      <p className="flex items-center">
                        📧 {doctor.email}
                      </p>
                    )}
                    {doctor.phone && (
                      <p className="flex items-center">
                        📞 {doctor.phone}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}