import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMe,
  getSymptoms,
  getAppointments,
} from "../../services/dashboardService";
function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [symptoms, setSymptoms] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userData = await getMe();
        const symptomsData = await getSymptoms();
        const appointmentsData = await getAppointments();

        setUserName(userData.name || "Utilisateur");
        setSymptoms(symptomsData.length || 0);
        setAppointments(appointmentsData || []);
      } catch (err) {
        setError("Impossible de charger les données.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Chargement...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  }
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      <div style={styles.welcomeBox}>
        <h2 style={styles.welcomeText}>Bonjour, {userName} 👋</h2>
        <p style={styles.subText}>Bienvenue dans votre espace santé</p>
      </div>

      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Nombre de symptômes</h3>
          <p style={styles.cardValue}>{symptoms}</p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Prochains rendez-vous</h3>
          <p style={styles.cardValue}>{appointments.length}</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/ai")}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "12px 25px",
          backgroundColor: "#6c63ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Aller vers Assistant IA
      </button>
      <div style={styles.appointmentsSection}>
        <h2 style={styles.sectionTitle}>Liste des rendez-vous à venir</h2>

        {appointments.length === 0 ? (
          <p>Aucun rendez-vous à venir.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <p>
                <strong>Médecin :</strong> {appointment.doctor}
              </p>
              <p>
                <strong>Date :</strong>{" "}
                {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Heure :</strong> {appointment.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6fb",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  welcomeBox: {
    background: "linear-gradient(135deg, #6c63ff, #5a55d4)",
    color: "white",
    padding: "25px",
    borderRadius: "15px",
    marginBottom: "30px",
    textAlign: "center",
  },
  welcomeText: {
    margin: 0,
    fontSize: "24px",
  },
  subText: {
    marginTop: "10px",
    opacity: 0.9,
  },
  cardsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    padding: "25px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  cardTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    color: "#555",
  },
  cardValue: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#6c63ff",
  },
  appointmentsSection: {
    marginTop: "20px",
  },
  sectionTitle: {
    marginBottom: "15px",
    color: "#333",
  },
  appointmentCard: {
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
};

export default Dashboard;
