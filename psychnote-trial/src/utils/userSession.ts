// Generate or retrieve a unique user session ID
export function getUserSessionId(): string {
  const SESSION_KEY = 'psychnote_user_session';
  
  // Check if we already have a session ID
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // Generate a new unique session ID
    sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}
