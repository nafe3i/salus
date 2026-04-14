import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/medecin/${doctorId}`);
        setDoctor(response.data.data || response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = `${date} 00:00:00`;
      await api.post('/appointments', {
        medecin_id: doctorId,
        appointment_date: formattedDate,
      });
      alert('Rendez-vous confirmé !');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Erreur');
    }
  };

  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (!doctor) return <div className="p-10 text-center text-red-500">Médecin introuvable.</div>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">Réserver avec {doctor.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Choisir une date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded" 
            required 
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">
          Confirmer la réservation
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;