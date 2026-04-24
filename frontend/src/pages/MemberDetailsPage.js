import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './MemberDetailsPage.css';

const BACKEND = 'http://localhost:5000';

function MemberDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND}/members/${id}`);
        setMember(res.data);
      } catch (err) {
        setError('Member not found or server is unavailable.');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`${BACKEND}/members/${id}`);
      navigate('/view');
    } catch (err) {
      alert('Failed to delete member.');
    }
  };

  const parseHobbies = (hobbies) => {
    if (!hobbies) return [];
    return hobbies.split(',').map(h => h.trim()).filter(Boolean);
  };

  if (loading) return (
    <div>
      <Navbar />
      <div className="loading-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Fetching member details...</p>
      </div>
    </div>
  );

  if (error) return (
    <div>
      <Navbar />
      <div className="page-container" style={{ paddingTop: '3rem' }}>
        <div className="alert alert-error">{error}</div>
        <Link to="/view" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          ← Back to Members
        </Link>
      </div>
    </div>
  );

  const hobbiesList = parseHobbies(member.hobbies);

  return (
    <div>
      <Navbar />
      <div className="page-container details-page">

        {/* Back button */}
        <button
          className="back-btn"
          onClick={() => navigate('/view')}
        >
          ← Back to Members
        </button>

        <div className="details-layout fade-in">
          {/* Left: Profile Image & Quick Info */}
          <div className="details-left">
            <div className="details-img-wrap">
              {member.image ? (
                <img
                  src={`${BACKEND}/uploads/${member.image}`}
                  alt={member.name}
                  className="details-img"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
              ) : null}
              <div
                className="details-img-placeholder"
                style={{ display: member.image ? 'none' : 'flex' }}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="details-quick">
              <h1 className="details-name">{member.name}</h1>
              <p className="details-degree">
                {member.degree} · {member.year}
              </p>
              {member.role && (
                <span className="badge badge-accent details-role">{member.role}</span>
              )}
            </div>

            <div className="details-actions">
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                🗑 Delete Member
              </button>
            </div>
          </div>

          {/* Right: Full Details */}
          <div className="details-right">
            {/* Basic Info */}
            <div className="detail-section">
              <h2 className="section-title">📋 Basic Information</h2>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{member.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Roll Number</span>
                  <span className="detail-value">{member.roll}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">{member.year}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Degree</span>
                  <span className="detail-value">{member.degree}</span>
                </div>
                {member.email && (
                  <div className="detail-item">
                    <span className="detail-label">Email / Contact</span>
                    <span className="detail-value">
                      <a href={`mailto:${member.email}`} className="detail-link">
                        {member.email}
                      </a>
                    </span>
                  </div>
                )}
                {member.role && (
                  <div className="detail-item">
                    <span className="detail-label">Role</span>
                    <span className="detail-value">{member.role}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="divider"></div>

            {/* Project */}
            {member.aboutProject && (
              <>
                <div className="detail-section">
                  <h2 className="section-title">🚀 About Project</h2>
                  <p className="detail-text">{member.aboutProject}</p>
                </div>
                <div className="divider"></div>
              </>
            )}

            {/* Certificate & Internship */}
            {(member.certificate || member.internship) && (
              <>
                <div className="detail-section">
                  <div className="detail-grid">
                    {member.certificate && (
                      <div className="detail-item">
                        <span className="detail-label">📜 Certificate</span>
                        <span className="detail-value">{member.certificate}</span>
                      </div>
                    )}
                    {member.internship && (
                      <div className="detail-item">
                        <span className="detail-label">💼 Internship</span>
                        <span className="detail-value">{member.internship}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="divider"></div>
              </>
            )}

            {/* Aim */}
            {member.aboutYourAim && (
              <>
                <div className="detail-section">
                  <h2 className="section-title">🎯 About Your Aim</h2>
                  <p className="detail-text">{member.aboutYourAim}</p>
                </div>
                <div className="divider"></div>
              </>
            )}

            {/* Hobbies */}
            {hobbiesList.length > 0 && (
              <div className="detail-section">
                <h2 className="section-title">✨ Hobbies</h2>
                <div className="hobbies-list">
                  {hobbiesList.map((hobby, i) => (
                    <span key={i} className="hobby-tag">{hobby}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDetailsPage;
