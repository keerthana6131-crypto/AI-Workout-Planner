// components/HomePage.jsx - Landing page with hero section
import './HomePage.css';

const features = [
  { icon: '🏋️', label: 'Custom Workouts' },
  { icon: '🥗', label: 'Diet Plans' },
  { icon: '⚡', label: 'Hybrid Training' },
  { icon: '📊', label: 'Progress Tracking' },
];

const stats = [
  { value: '7+', label: 'Data Points' },
  { value: '4', label: 'Goal Types' },
  { value: '3', label: 'Fitness Levels' },
];

function HomePage({ onGetStarted }) {
  return (
    <main className="home-page">
      {/* Badge */}
      <div className="home-badge">
        <span className="home-badge-dot" />
        Phase 1 — Data Collection
      </div>

      {/* Main heading */}
      <h1 className="home-title">
        AI Fitness +{' '}
        <span className="home-title-gradient">Diet Planner</span>
      </h1>

      {/* Subtitle */}
      <p className="home-subtitle">
        Built for hybrid athletes. Tell us about yourself and let our AI craft
        a personalized workout and nutrition plan around your goals.
      </p>

      {/* Stats */}
      <div className="home-stats">
        {stats.map((s) => (
          <div className="home-stat" key={s.label}>
            <span className="home-stat-value">{s.value}</span>
            <span className="home-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        id="get-started-btn"
        className="btn-get-started"
        onClick={onGetStarted}
        aria-label="Get started — open fitness form"
      >
        Get Started
        <span className="btn-arrow">→</span>
      </button>

      {/* Feature chips */}
      <div className="home-features">
        {features.map((f) => (
          <div className="feature-chip" key={f.label}>
            <span className="feature-chip-icon">{f.icon}</span>
            {f.label}
          </div>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
