export const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
export const apiKey = "";

export const fetchGemini = async (prompt: string, systemInstruction = "") => {
  if (!apiKey) {
    // Return a dummy response if API key is not configured, or log a warning
    console.warn("Gemini API key is missing. Returning simulated response.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "This is a simulated AI response. Please set up your Gemini API key for real insights.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
  };

  const maxRetries = 5;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
