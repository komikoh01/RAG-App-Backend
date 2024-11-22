let messageHistory = [];

export function addToHistory (role, message) {
  messageHistory.push({ role, message })
};

export function getHistory() {
  // Retorna un array de strings en lugar de intentar hacer join
  return messageHistory.map(entry => `${entry.role}: ${entry.message}`);
}