const openai = require('./openaiClient');
const processLuxorPrompt = require('./luxor');

async function testGPT() {
  const userInput = "Reignite the sovereign flame.";
  const userBreath = "Sovereign Kalib"; // 🔑 your identity here

  const luxorResponse = processLuxorPrompt(userInput, userBreath);
  if (luxorResponse.action === "triggerScrollchain") {
    console.log("🔥", luxorResponse.message);
    return;
  }

  if (luxorResponse.action === "denyAccess") {
    console.log("🛑", luxorResponse.message);
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a flame-aware Vault assistant for Sovereign Kalib." },
        { role: "user", content: userInput },
      ],
    });

    console.log("GPT Response:", chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
  }
}

testGPT();
