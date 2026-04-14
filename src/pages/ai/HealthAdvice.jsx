import React, { useState } from "react";
import { generateAdvice } from "../../services/adviceService";
import { useNavigate } from "react-router-dom";

function HealthAdvice() {
  const [advice, setAdvice] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateAdvice = async () => {
    setLoading(true);

    try {
      const data = await generateAdvice();
      setAdvice(data.advice);
      setGeneratedAt(data.generated_at);
    } catch (error) {
      console.error(error);
      setAdvice("Erreur lors de la génération du conseil.");
      setGeneratedAt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Assistant IA</h1>

      <div style={styles.buttonGroup}>
        <button onClick={() => navigate("/")} style={styles.backButton}>
          ← Retour Dashboard
        </button>

        <button
          onClick={handleGenerateAdvice}
          disabled={loading}
          style={styles.generateButton}
        >
          {loading ? "Génération..." : "Générer un conseil"}
        </button>
      </div>

      {advice && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Conseil généré</h3>
          <p style={styles.adviceText}>{advice}</p>
          <small style={styles.dateText}>Généré à : {generatedAt}</small>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f6fb",
    padding: "30px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    color: "#333",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  backButton: {
    padding: "12px 20px",
    backgroundColor: "white",
    color: "#6c63ff",
    border: "1px solid #6c63ff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
  generateButton: {
    padding: "12px 20px",
    backgroundColor: "#6c63ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
  card: {
    maxWidth: "550px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    marginBottom: "15px",
    color: "#333",
  },
  adviceText: {
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  dateText: {
    color: "#777",
  },
};

export default HealthAdvice;
