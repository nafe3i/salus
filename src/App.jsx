<<<<<<< HEAD
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import HealthAdvice from "./pages/ai/HealthAdvice";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai" element={<HealthAdvice />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorsList from './pages/doctors/DoctorsList';
import DoctorDetail from './pages/doctors/DoctorDetail';
import Appointments from './pages/appointments/Appointments';
import BookAppointment from './pages/appointments/BookAppointment';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<DoctorsList />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/book/:doctorId" element={<BookAppointment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> 2112893c16bb5dc318916f3748b36585fc188ddd
