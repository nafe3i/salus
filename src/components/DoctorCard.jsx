import React from 'react';

const DoctorCard = ({ doctor, onBook }) => {
  const displayName = doctor.name.startsWith('Dr.') ? doctor.name : `Dr. ${doctor.name}`;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 flex flex-col items-center text-center">
      <div className="bg-gray-100 px-3 py-1 rounded-full mb-2">
        <span className="text-blue-700 text-xs font-bold uppercase">
          {doctor.specialty}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {displayName}
      </h3>
      <p className="text-gray-500 text-sm mb-4">{doctor.city}</p>
      <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-blue-600 font-bold">{doctor.consultation_price} DH</span>
        <button 
          onClick={() => onBook(doctor.id)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700"
        >
          Réserver
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;