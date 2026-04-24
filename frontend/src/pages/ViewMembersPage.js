import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './ViewMembersPage.css';

const BACKEND = 'http://localhost:5000';

function ViewMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${BACKEND}/members`);
      setMembers(res.data);
    } catch (err) {
      setError('Could not load members. Make sure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await axios.delete(`${BACKEND}/members/${id}`);
      setMembers(prev => prev.filter(m => m._id !== id));
    } catch (err) {
      alert('Failed to delete member.');
    }
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(search.toLowerCase())) ||
    (m.degree && m.degree.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <Navbar />
      <div className="page-container view-members-page">
        <div className="view-header">
          <div className="page-header">
            <h1 className="page-title">Meet Our <span>Amazing Team</span></h1>
            <p className="page-subtitle">{members.length} member{members.length !== 1 ? 's' : ''} registered</p>
          </div>
          <div className="view-controls">
            <input
              type="text"
              className="form-input search-input"
              placeholder="🔍 Search by name or role..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Link to="/add" className="btn btn-primary btn-sm">＋ Add Member</Link>
          </div>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading team members...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>{search ? 'No results found' : 'No members yet'}</h3>
            <p>{search ? 'Try a different search term.' : 'Add your first team member to get started!'}</p>
            {!search && (
              <Link to="/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                ＋ Add First Member
              </Link>
            )}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="members-grid">
            {filtered.map((member, i) => (
              <div
                key={member._id}
                className="member-card fade-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="member-card-img-wrap">
                  {member.image ? (
                    <img
                      src={`${BACKEND}/uploads/${member.image}`}
                      alt={member.name}
                      className="member-card-img"
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div
                    className="member-card-placeholder"
                    style={{ display: member.image ? 'none' : 'flex' }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="member-card-body">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-roll">Roll No: {member.roll}</p>
                  {member.role && (
                    <span className="badge badge-accent member-role">{member.role}</span>
                  )}
                  {member.degree && (
                    <p className="member-degree">{member.degree} · {member.year}</p>
                  )}
                </div>

                <div className="member-card-actions">
                  <Link
                    to={`/members/${member._id}`}
                    className="btn btn-outline btn-sm view-details-btn"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => handleDelete(member._id, e)}
                    title="Delete member"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewMembersPage;
