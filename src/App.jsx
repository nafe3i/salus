import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import SymptomsList from "./pages/symptoms/SymptomsList";
import AddSymptom from "./pages/symptoms/AddSymptom";
import EditSymptom from "./pages/symptoms/EditSymptom";
import DoctorsList from "./pages/doctors/DoctorsList";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AppointmentsList from "./pages/appointments/AppointmentsList";
import AddAppointment from "./pages/appointments/AddAppointment";
import HealthAdvice from "./pages/ai/HealthAdvice";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/symptoms"
          element={
            <ProtectedRoute>
              <SymptomsList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/symptoms/add"
          element={
            <ProtectedRoute>
              <AddSymptom />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/symptoms/edit/:id"
          element={
            <ProtectedRoute>
              <EditSymptom />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorsList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/doctors/:id"
          element={
            <ProtectedRoute>
              <DoctorDetails />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsList />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments/add"
          element={
            <ProtectedRoute>
              <AddAppointment />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/ai-advice"
          element={
            <ProtectedRoute>
              <HealthAdvice />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;