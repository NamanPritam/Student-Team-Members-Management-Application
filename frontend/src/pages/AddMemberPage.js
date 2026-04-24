import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddMemberPage.css';

const BACKEND = 'http://localhost:5000';

function AddMemberPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    year: '',
    degree: '',
    email: '',
    role: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutYourAim: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.roll.trim()) newErrors.roll = 'Roll number is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      if (imageFile) data.append('image', imageFile);

      await axios.post(`${BACKEND}/members`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAlert({ type: 'success', message: '✅ Member added successfully!' });
      setTimeout(() => navigate('/view'), 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to add member. Is the backend running?';
      setAlert({ type: 'error', message: `❌ ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container add-member-page">
        <div className="page-header">
          <h1 className="page-title">Add <span>Team Member</span></h1>
          <p className="page-subtitle">Fill in the details to register a new member</p>
        </div>

        {alert.message && (
          <div className={`alert alert-${alert.type}`}>{alert.message}</div>
        )}

        <div className="form-layout">
          {/* Image Upload Panel */}
          <div className="image-panel">
            <div
              className="image-upload-box"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>Click to upload photo</p>
                  <span>JPG, PNG, GIF up to 5MB</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            {imageFile && (
              <p className="image-filename">📎 {imageFile.name}</p>
            )}
            <button
              type="button"
              className="btn btn-outline btn-sm"
              style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? 'Change Photo' : 'Browse Photo'}
            </button>
          </div>

          {/* Form Panel */}
          <form className="member-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Dharani Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Roll Number *</label>
                <input
                  type="text"
                  name="roll"
                  className={`form-input ${errors.roll ? 'input-error' : ''}`}
                  placeholder="e.g. RA2111003010001"
                  value={formData.roll}
                  onChange={handleChange}
                />
                {errors.roll && <span className="error-msg">{errors.roll}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Year *</label>
                <input
                  type="text"
                  name="year"
                  className={`form-input ${errors.year ? 'input-error' : ''}`}
                  placeholder="e.g. 2024"
                  value={formData.year}
                  onChange={handleChange}
                />
                {errors.year && <span className="error-msg">{errors.year}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Degree *</label>
                <input
                  type="text"
                  name="degree"
                  className={`form-input ${errors.degree ? 'input-error' : ''}`}
                  placeholder="e.g. B.Tech"
                  value={formData.degree}
                  onChange={handleChange}
                />
                {errors.degree && <span className="error-msg">{errors.degree}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="e.g. dharani@srmist.edu.in"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-input"
                  placeholder="e.g. Frontend Developer"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">About Project</label>
              <textarea
                name="aboutProject"
                className="form-textarea"
                placeholder="Brief description of your project..."
                value={formData.aboutProject}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Hobbies (comma separated)</label>
                <input
                  type="text"
                  name="hobbies"
                  className="form-input"
                  placeholder="e.g. coding, reading, gaming"
                  value={formData.hobbies}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Certificate</label>
                <input
                  type="text"
                  name="certificate"
                  className="form-input"
                  placeholder="e.g. fullstack, AWS"
                  value={formData.certificate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Internship</label>
              <input
                type="text"
                name="internship"
                className="form-input"
                placeholder="e.g. cloud computing at XYZ"
                value={formData.internship}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">About Your Aim</label>
              <textarea
                name="aboutYourAim"
                className="form-textarea"
                placeholder="Your goals and aspirations..."
                value={formData.aboutYourAim}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="btn-spinner"></span>
                    Submitting...
                  </>
                ) : '✓ Submit Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberPage;
