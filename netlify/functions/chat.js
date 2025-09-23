import fetch from "node-fetch";

export async function handler(event, context) {
  const body = JSON.parse(event.body);

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: body.message }] }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.candidates[0].content.parts[0].text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de la requête à Gemini" })
    };
  }
}
