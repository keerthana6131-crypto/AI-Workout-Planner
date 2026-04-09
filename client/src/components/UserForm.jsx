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
      // Send data to backend
      await axios.post('http://localhost:5000/user', {
        weight: Number(form.weight),
        height: Number(form.height),
        age: Number(form.age),
        goal: form.goal,
        level: form.level,
        equipment: form.equipment,
        time: Number(form.time),
      });

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
        <div className="form-card">
          <div className="success-card">
            <span className="success-icon">🎉</span>
            <h2 className="success-title">You're All Set!</h2>
            <p className="success-desc">
              Your fitness profile has been saved. Phase 2 will use this data to generate
              your personalized AI workout and diet plan.
            </p>
            <button
              className="btn-start-again"
              onClick={() => {
                setForm(INITIAL_STATE);
                setErrors({});
                setSubmitted(false);
              }}
            >
              Submit Another Profile
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
