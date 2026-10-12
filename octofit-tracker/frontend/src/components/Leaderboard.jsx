import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setLeaderboard(normalizeApiResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load leaderboard');
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Leaderboard</h1>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {leaderboard.map((entry) => (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.rank}>
            <div>
              <strong>#{entry.rank}</strong>
              <div>{entry.displayName || entry.user?.name || 'Unknown athlete'}</div>
            </div>
            <span className="badge bg-warning text-dark">{entry.points || 0}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Leaderboard;
