import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeApiResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load teams');
      }
    };

    fetchTeams();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Teams</h1>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id || team.name}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5">{team.name}</h2>
                <p className="text-secondary mb-2">{team.description || 'No description yet.'}</p>
                <span className="badge bg-primary-subtle text-primary">{team.focus || 'General'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Teams;
