export const logEvent = (eventType, data) => {
  const log = {
    eventType,
    timestamp: new Date().toISOString(),
    ...data,
  };
  // Store in localStorage/sessionStorage for demo (not console.log)
  let logs = JSON.parse(localStorage.getItem('appLogs') || '[]');
  logs.push(log);
  localStorage.setItem('appLogs', JSON.stringify(logs));
};
