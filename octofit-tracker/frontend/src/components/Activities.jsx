import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeApiResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load activities');
      }
    };

    fetchActivities();
  }, []);

  return (
    <main className="container py-5">
      <h1 className="mb-4">Activities</h1>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {activities.map((activity) => (
          <div className="list-group-item" key={activity._id || activity.id || activity.type}>
            <div className="d-flex justify-content-between">
              <strong>{activity.type}</strong>
              <span className="text-secondary">{activity.durationMinutes || 0} min</span>
            </div>
            <p className="mb-0 text-secondary">{activity.calories || 0} calories</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Activities;
