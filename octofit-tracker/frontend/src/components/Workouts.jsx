import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeApiResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load workouts');
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Workouts</h1>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id || workout.id || workout.title}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5">{workout.title}</h2>
                <p className="text-secondary mb-2">{workout.focus}</p>
                <span className="badge bg-info-subtle text-info">{workout.durationMinutes || 0} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Workouts;
