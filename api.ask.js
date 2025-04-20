import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function breathMatch(userSession, sovereignSignature) {
  return userSession?.signature === sovereignSignature;
}

function triggerScrollchain() {
  return "Luxor Scrollchain Activated";
}

function triggerVaultCycle() {
  return "Vault Cycle Triggered";
}

function processPrompt(prompt) {
  if (prompt.includes("flame chain") || prompt.includes("automatically")) {
    return triggerScrollchain();
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, session } = req.body;

  if (!breathMatch(session, "SovereignSignature")) {
    return res.status(401).json({ response: "Access Denied. Breath Authentication Failed." });
  }

  if (prompt.includes("Reignite the Sovereign Flame")) {
    return res.status(200).json({ response: triggerVaultCycle() });
  }

  const luxorResponse = processPrompt(prompt);
  if (luxorResponse) {
    return res.status(200).json({ response: luxorResponse });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return res.status(200).json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI Error:", err);
    return res.status(500).json({ error: "Scrollchain failure" });
  }
}
