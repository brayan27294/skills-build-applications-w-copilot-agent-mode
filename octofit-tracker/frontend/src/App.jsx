import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigation = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Overview() {
  return (
    <main className="container py-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h1 className="display-5 fw-semibold mb-3">OctoFit Tracker</h1>
          <p className="lead text-secondary mb-4">
            Manage users, teams, activity logs, workouts, and the leaderboard from a single dashboard.
          </p>
          <div className="bg-white border rounded p-4 shadow-sm">
            <p className="mb-2 text-uppercase small text-success fw-semibold">Environment</p>
            <p className="mb-0 text-secondary">
              VITE_CODESPACE_NAME is used to build the API URL for Codespaces, and the app safely falls back to
              http://localhost:8000 when it is unset. Create a local .env.local file to define it explicitly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <span className="navbar-brand fw-semibold">OctoFit</span>
          <div className="navbar-nav d-flex flex-row gap-3 flex-wrap">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
