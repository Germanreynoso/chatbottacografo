// Utilidad para obtener o generar un session_id único por usuario/sesión
export function getSessionId(): string {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    // Usa crypto.randomUUID si está disponible, si no, usa un fallback simple
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      sessionId = crypto.randomUUID();
    } else {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
}
