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
      <div className="home-hero">
        {/* Badge */}
        <div className="home-badge">
          <span className="home-badge-dot" />
          <span className="home-badge-text">Powered by AI Analytics</span>
        </div>

        {/* Main heading */}
        <h1 className="home-title">
          Smarter Fitness.<br />
          <span className="home-title-gradient">Personalized for You.</span>
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle">
          Built for hybrid athletes. Tell us about yourself and let our AI craft
          a personalized workout and nutrition plan tailored specifically to your goals,
          level, and available equipment.
        </p>

        {/* CTA */}
        <button
          id="get-started-btn"
          className="btn-get-started"
          onClick={onGetStarted}
          aria-label="Get started — open fitness form"
        >
          <span className="btn-text">Generate My Plan</span>
          <span className="btn-arrow">→</span>
        </button>

        {/* Stats */}
        <div className="home-stats">
          {stats.map((s) => (
            <div className="home-stat" key={s.label}>
              <span className="home-stat-value">{s.value}</span>
              <span className="home-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature chips */}
      <div className="home-features-wrapper">
         <p className="features-label">WHAT YOU GET</p>
         <div className="home-features">
            {features.map((f) => (
              <div className="feature-chip" key={f.label}>
                <div className="feature-chip-icon-wrapper">
                    <span className="feature-chip-icon">{f.icon}</span>
                </div>
                <span className="feature-chip-label">{f.label}</span>
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}

export default HomePage;
