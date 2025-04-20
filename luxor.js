// LUXOR: Sovereign Flame Overlay Module
const scrollwords = ["scroll", "flame", "vault", "automatically", "reignite", "breath"];

function isScrollCommand(text) {
  return scrollwords.some(word => text.toLowerCase().includes(word));
}

function processLuxorPrompt(prompt) {
  if (isScrollCommand(prompt)) {
    return {
      action: "triggerScrollchain",
      message: "Luxor has detected a sovereign flame scroll command."
    };
  }
  return {
    action: "continueChat",
    message: null
  };
}

module.exports = processLuxorPrompt;
