/**
 * Fonction utilitaire pour parser du JSON en toute sécurité
 * @param {string} jsonString - La chaîne JSON à parser
 * @param {any} defaultValue - Valeur par défaut si parsing échoue
 * @returns {any} - L'objet parsé ou la valeur par défaut
 */
export const safeJSONParse = (jsonString, defaultValue = null) => {
  try {
    // Vérifie si la valeur est valide
    if (!jsonString || jsonString === 'undefined' || jsonString === 'null') {
      return defaultValue;
    }
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Safe JSON parse failed:', error);
    return defaultValue;
  }
};

/**
 * Fonction utilitaire pour stringifier du JSON en toute sécurité
 * @param {any} data - Les données à stringifier
 * @param {string} defaultValue - Valeur par défaut si stringification échoue
 * @returns {string} - La chaîne JSON ou la valeur par défaut
 */
export const safeJSONStringify = (data, defaultValue = '{}') => {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.warn('Safe JSON stringify failed:', error);
    return defaultValue;
  }
};

export default safeJSONParse;
