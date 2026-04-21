import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aiService from "../../services/aiService";
import symptomService from "../../services/symptomService";

export default function HealthAdvice() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const result = await symptomService.getAll();
      if (result.success) {
        const symptomsData = result.data.data || result.data || [];
        setSymptoms(Array.isArray(symptomsData) ? symptomsData : []);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to load symptoms");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleGenerateAdvice = async (e) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log('Génération de conseil IA pour symptômes:', selectedSymptoms);
      const result = await aiService.generateAdvice({
        symptom_ids: selectedSymptoms
      });
      
      console.log('Réponse IA:', result);
      
      if (result.success) {
        // Gérer différentes structures de réponse Laravel
        const responseData = result.data?.data || result.data;
        const adviceText = responseData?.advice || responseData?.message || responseData?.response || 
                          result.data?.advice || result.data?.message || result.data?.response ||
                          "Advice generated successfully";
        
        console.log('Conseil IA extrait:', adviceText);
        setAdvice(adviceText);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Erreur génération conseil IA:', err);
      setError("Failed to generate health advice");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAdvice = () => {
    setAdvice("");
    setSelectedSymptoms([]);
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
              <p className="mt-1 text-sm text-gray-600">
                Get personalized health advice powered by AI
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptoms Selection */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Select Your Symptoms
            </h2>
            
            {symptoms.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                No symptoms recorded. Add symptoms first to get AI advice.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {symptoms.map((symptom) => (
                  <label
                    key={symptom.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom.id)}
                      onChange={() => handleSymptomToggle(symptom.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {symptom.name}
                        </span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          symptom.severity === 'mild' ? 'bg-green-100 text-green-800' :
                          symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {symptom.severity}
                        </span>
                      </div>
                      {symptom.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {symptom.description}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleGenerateAdvice}
                disabled={loading || selectedSymptoms.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Advice...
                  </div>
                ) : (
                  "🤖 Generate Health Advice"
                )}
              </button>
            </div>
          </div>

          {/* AI Advice Display */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                AI Health Advice
              </h2>
              {advice && (
                <button
                  onClick={handleClearAdvice}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {advice ? (
              <div className="prose prose-sm max-w-none">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🤖</span>
                    <div>
                      <h3 className="font-medium text-blue-900 mb-2">
                        AI Health Recommendation
                      </h3>
                      <div className="text-blue-800 whitespace-pre-wrap">
                        {advice}
                      </div>
                      <p className="text-xs text-blue-600 mt-3 italic">
                        Generated on {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-gray-600">
                  Select your symptoms and click "Generate Health Advice" to get personalized AI recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}