export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidates = ['results', 'data', 'items', 'users', 'teams', 'activities', 'leaderboard', 'workouts'];
  for (const key of candidates) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  return [];
}
