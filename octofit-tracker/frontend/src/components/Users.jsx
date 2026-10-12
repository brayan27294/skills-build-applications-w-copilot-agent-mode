import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiResponse } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeApiResponse(payload));
      } catch (loadError) {
        setError(loadError.message || 'Unable to load users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Users</h1>
      </div>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id || user.email}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h2 className="h5 mb-1">{user.name}</h2>
                <p className="text-secondary mb-2">{user.email}</p>
                <span className="badge bg-success-subtle text-success">
                  {user.fitnessLevel || 'beginner'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Users;
