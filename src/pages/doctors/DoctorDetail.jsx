import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data.data || response.data);
      } catch (error) {
        console.error("Erreur details médecin", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (!doctor) return <div className="p-10 text-center">Médecin introuvable.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 text-blue-600 flex items-center">
        ← Retour à la liste
      </button>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 text-4xl font-bold">
            {doctor.name.charAt(0)}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">Dr. {doctor.name}</h1>
            <p className="text-blue-600 font-medium text-lg mb-4">{doctor.specialty}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Expérience</p>
                <p className="font-bold">{doctor.years_of_experience} ans</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Prix Consultation</p>
                <p className="font-bold text-green-600">{doctor.consultation_price} DH</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Ville</p>
                <p className="font-bold">{doctor.city}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Disponibilité</p>
                <p className="font-bold text-sm">{doctor.available_days}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/appointments/book/${doctor.id}`)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Prendre un rendez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;