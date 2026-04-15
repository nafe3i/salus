import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import DoctorCard from '../../components/DoctorCard';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/medecin');
        setDoctors(response.data.data || response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc =>
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Nos Médecins</h1>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
            className="w-full max-w-sm px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard 
                key={doctor.id} 
                doctor={doctor} 
                onBook={(id) => window.location.href = `/appointments/book/${id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;