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
