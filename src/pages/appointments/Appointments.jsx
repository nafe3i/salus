import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadList() {
      try {
        const response = await api.get('/appointments');
        setAppointments(response.data.data || response.data);
      } catch (error) {
        console.error('Erreur chargement rendez-vous', error);
      }
    }
    loadList();
  }, []);

  async function cancelAppointment(id) {
    const ok = window.confirm('Voulez-vous vraiment annuler ce rendez-vous ?');
    if (!ok) return;

    try {
      await api.delete(`/appointments/${id}`);
      const response = await api.get('/appointments');
      setAppointments(response.data.data || response.data);
    } catch {
      alert("Erreur lors de l'annulation");
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mes Rendez-vous</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Médecin</th>
              <th className="p-4">Date</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="p-4">{app.doctor?.name}</td>
                <td className="p-4">{new Date(app.appointment_date).toLocaleString()}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      app.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => cancelAppointment(app.id)}
                    className="text-red-600 hover:underline"
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
