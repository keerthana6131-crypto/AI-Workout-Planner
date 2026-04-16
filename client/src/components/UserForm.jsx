// components/UserForm.jsx - Fitness data input form
import { useState } from 'react';
import './UserForm.css';

const GOALS = ['muscle gain', 'fat loss', 'stamina', 'hybrid'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const EQUIPMENT = ['none', 'resistance bands', 'dumbbells'];

const INITIAL_STATE = {
  weight: '',
  height: '',
  age: '',
  goal: '',
  fitnessLevel: '',
  equipment: '',
  time: '',
};

function UserForm({ onBack }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.weight) newErrors.weight = 'Required';
    if (!form.height) newErrors.height = 'Required';
    if (!form.age) newErrors.age = 'Required';
    if (!form.goal) newErrors.goal = 'Required';
    if (!form.fitnessLevel) newErrors.fitnessLevel = 'Required';
    if (!form.equipment) newErrors.equipment = 'Required';
    if (!form.time) newErrors.time = 'Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to analyze data');
      }

      setSubmitted(true);
      // Optional: Show native alert as requested per requirements
      // alert('Success: ' + data.message);
    } catch (error) {
      setServerError(error.message || 'Failed to connect to the server. Is it running?');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="form-page">
        <div className="form-card success-card-container">
          <div className="success-content">
            <div className="success-icon-wrapper">
              <span className="success-icon">✨</span>
            </div>
            <h2 className="success-title">Plan Generated Successfully!</h2>
            <p className="success-desc">
              Your profile has been saved to the database. The AI analysis engine is now optimizing your workout and diet plan.
            </p>
            <button
              className="btn-start-again"
              onClick={() => {
                setForm(INITIAL_STATE);
                setErrors({});
                setSubmitted(false);
              }}
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="form-page">
      <button className="form-back-btn" onClick={onBack}>
        <span className="back-arrow">←</span> Back
      </button>

      <div className="form-card">
        <div className="form-header">
          <div className="form-step-indicator">
            <div className="step active"></div>
            <div className="step"></div>
            <div className="step"></div>
          </div>
          <h1 className="form-title">Tell us about yourself</h1>
          <p className="form-subtitle">We need a few details to build your perfect plan.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Personal Details Row */}
            <div className="form-row three-cols">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="e.g. 75"
                  value={form.weight}
                  onChange={handleChange}
                  className={errors.weight ? 'error' : ''}
                />
              </div>
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  placeholder="e.g. 180"
                  value={form.height}
                  onChange={handleChange}
                  className={errors.height ? 'error' : ''}
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 28"
                  value={form.age}
                  onChange={handleChange}
                  className={errors.age ? 'error' : ''}
                />
              </div>
            </div>

            {/* Goals & Level Row */}
            <div className="form-row two-cols">
              <div className="form-group">
                <label>Primary Goal</label>
                <div className="select-wrapper">
                  <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className={errors.goal ? 'error' : ''}
                  >
                    <option value="" disabled>Select goal...</option>
                    {GOALS.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Fitness Level</label>
                <div className="select-wrapper">
                  <select
                    name="fitnessLevel"
                    value={form.fitnessLevel}
                    onChange={handleChange}
                    className={errors.fitnessLevel ? 'error' : ''}
                  >
                    <option value="" disabled>Select level...</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>

             {/* Logistics Row */}
             <div className="form-row two-cols">
              <div className="form-group">
                <label>Equipment Available</label>
                <div className="select-wrapper">
                  <select
                    name="equipment"
                    value={form.equipment}
                    onChange={handleChange}
                    className={errors.equipment ? 'error' : ''}
                  >
                    <option value="" disabled>Select eq...</option>
                    {EQUIPMENT.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Time per Session (min)</label>
                <input
                  type="number"
                  name="time"
                  placeholder="e.g. 45"
                  value={form.time}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                />
              </div>
            </div>
          </div>

          {serverError && <div className="server-error">{serverError}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <span className="loader"></span>
              ) : (
                'Submit Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default UserForm;
