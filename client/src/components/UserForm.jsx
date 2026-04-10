// components/UserForm.jsx - Fitness data input form
import { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

// --- Form fields configuration ---
const GOALS = ['muscle gain', 'fat loss', 'stamina', 'hybrid'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const EQUIPMENT = ['none', 'resistance bands', 'dumbbells'];

// Initial empty form state
const INITIAL_STATE = {
  weight: '',
  height: '',
  age: '',
  goal: '',
  level: '',
  equipment: '',
  time: '',
};

function UserForm({ onBack }) {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [aiPlan, setAiPlan] = useState(null);

  // --- Handle input changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // --- Client-side validation ---
  const validate = () => {
    const newErrors = {};

    if (!form.weight) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(form.weight) || Number(form.weight) <= 0) {
      newErrors.weight = 'Enter a valid weight';
    }

    if (!form.height) {
      newErrors.height = 'Height is required';
    } else if (isNaN(form.height) || Number(form.height) <= 0) {
      newErrors.height = 'Enter a valid height';
    }

    if (!form.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(form.age) || Number(form.age) <= 0 || Number(form.age) > 120) {
      newErrors.age = 'Enter a valid age (1–120)';
    }

    if (!form.goal) newErrors.goal = 'Please select a goal';
    if (!form.level) newErrors.level = 'Please select your fitness level';
    if (!form.equipment) newErrors.equipment = 'Please select equipment';

    if (!form.time) {
      newErrors.time = 'Time is required';
    } else if (isNaN(form.time) || Number(form.time) <= 0) {
      newErrors.time = 'Enter a valid time in minutes';
    }

    return newErrors;
  };

  // --- Handle form submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    // Run validation
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Send data to backend and receive AI plan
      const response = await axios.post('http://localhost:5000/analyze-user', {
        weight: Number(form.weight),
        height: Number(form.height),
        age: Number(form.age),
        goal: form.goal,
        level: form.level,
        equipment: form.equipment,
        time: Number(form.time),
      });

      // Save the generated plan
      if (response.data && response.data.aiPlan) {
        setAiPlan(response.data.aiPlan);
      }

      // Show success screen
      setSubmitted(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Something went wrong. Please check your connection and try again.';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  // --- Success screen ---
  if (submitted) {
    return (
      <main className="form-page">
        <div className="form-card" style={{ maxWidth: '600px' }}>
          <div className="success-card">
            <span className="success-icon" style={{ fontSize: '3rem', marginBottom: '10px', display: 'inline-block' }}>✨</span>
            <h2 className="success-title">Your AI Workflow Plan is Ready!</h2>
            <p className="success-desc">
              Based on your profile, our AI engine generated the perfect tailored strategy for you.
            </p>
            
            {aiPlan && (
              <div className="ai-plan-container" style={{
                  background: 'linear-gradient(145deg, #1f2937, #111827)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginTop: '20px',
                  marginBottom: '30px',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', color: '#60a5fa' }}>⚡ AI Plan Details</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Difficulty</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fcd34d', textTransform: 'capitalize' }}>{aiPlan.difficulty}</p>
                  </div>
                  
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workout Type</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#34d399', textTransform: 'capitalize' }}>{aiPlan.workoutType}</p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Training Mode</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f472b6', textTransform: 'uppercase' }}>{aiPlan.mode}</p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Focus</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#a78bfa', textTransform: 'capitalize' }}>{aiPlan.focus.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              className="btn-start-again"
              onClick={() => {
                setForm(INITIAL_STATE);
                setErrors({});
                setSubmitted(false);
                setAiPlan(null);
              }}
            >
              Start New Analysis
            </button>
          </div>
        </div>
      </main>
    );
  }

  // --- Main form ---
  return (
    <main className="form-page">
      {/* Back button */}
      <button className="form-back-btn" onClick={onBack} id="back-btn">
        ← Back to Home
      </button>

      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <div className="form-step-badge">Step 1 of 1</div>
          <h1 className="form-title">Your Fitness Profile</h1>
          <p className="form-subtitle">
            Fill in your details below. All fields are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate id="fitness-form">
          <div className="form-grid">

            {/* Weight */}
            <div className="form-group">
              <label className="form-label" htmlFor="weight">
                Weight <span>*</span> <em style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem', color: 'var(--text-muted)' }}>(kg)</em>
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                min="1"
                placeholder="e.g. 70"
                className={`form-input${errors.weight ? ' error' : ''}`}
                value={form.weight}
                onChange={handleChange}
              />
              {errors.weight && <span className="field-error">⚠ {errors.weight}</span>}
            </div>

            {/* Height */}
            <div className="form-group">
              <label className="form-label" htmlFor="height">
                Height <span>*</span> <em style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem', color: 'var(--text-muted)' }}>(cm)</em>
              </label>
              <input
                id="height"
                name="height"
                type="number"
                min="1"
                placeholder="e.g. 175"
                className={`form-input${errors.height ? ' error' : ''}`}
                value={form.height}
                onChange={handleChange}
              />
              {errors.height && <span className="field-error">⚠ {errors.height}</span>}
            </div>

            {/* Age */}
            <div className="form-group">
              <label className="form-label" htmlFor="age">
                Age <span>*</span> <em style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem', color: 'var(--text-muted)' }}>(years)</em>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                placeholder="e.g. 25"
                className={`form-input${errors.age ? ' error' : ''}`}
                value={form.age}
                onChange={handleChange}
              />
              {errors.age && <span className="field-error">⚠ {errors.age}</span>}
            </div>

            {/* Time */}
            <div className="form-group">
              <label className="form-label" htmlFor="time">
                Time Available <span>*</span> <em style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.75rem', color: 'var(--text-muted)' }}>(min/day)</em>
              </label>
              <input
                id="time"
                name="time"
                type="number"
                min="1"
                placeholder="e.g. 45"
                className={`form-input${errors.time ? ' error' : ''}`}
                value={form.time}
                onChange={handleChange}
              />
              {errors.time && <span className="field-error">⚠ {errors.time}</span>}
            </div>

            {/* Goal */}
            <div className="form-group">
              <label className="form-label" htmlFor="goal">
                Fitness Goal <span>*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="goal"
                  name="goal"
                  className={`form-select${errors.goal ? ' error' : ''}`}
                  value={form.goal}
                  onChange={handleChange}
                >
                  <option value="">Select a goal...</option>
                  {GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
              {errors.goal && <span className="field-error">⚠ {errors.goal}</span>}
            </div>

            {/* Level */}
            <div className="form-group">
              <label className="form-label" htmlFor="level">
                Fitness Level <span>*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="level"
                  name="level"
                  className={`form-select${errors.level ? ' error' : ''}`}
                  value={form.level}
                  onChange={handleChange}
                >
                  <option value="">Select level...</option>
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l.charAt(0).toUpperCase() + l.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
              {errors.level && <span className="field-error">⚠ {errors.level}</span>}
            </div>

            {/* Equipment */}
            <div className="form-group full-width">
              <label className="form-label" htmlFor="equipment">
                Available Equipment <span>*</span>
              </label>
              <div className="select-wrapper">
                <select
                  id="equipment"
                  name="equipment"
                  className={`form-select${errors.equipment ? ' error' : ''}`}
                  value={form.equipment}
                  onChange={handleChange}
                >
                  <option value="">Select equipment...</option>
                  {EQUIPMENT.map((eq) => (
                    <option key={eq} value={eq}>
                      {eq.charAt(0).toUpperCase() + eq.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="select-arrow">▼</span>
              </div>
              {errors.equipment && <span className="field-error">⚠ {errors.equipment}</span>}
            </div>

          </div>{/* end form-grid */}

          <hr className="form-divider" />

          {/* Server error */}
          {serverError && (
            <p className="field-error" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
              ⚠ {serverError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            id="submit-btn"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Saving...
              </>
            ) : (
              <>Save My Profile 🚀</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

export default UserForm;
