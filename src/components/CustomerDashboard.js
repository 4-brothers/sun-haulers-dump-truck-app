import React, { useState } from 'react';
import { createJobRequest } from '../utils/API';

const CustomerDashboard = () => {
  const [formData, setFormData] = useState({ pickup: '', dropoff: '', notes: '' });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJobRequest(formData);
      setJobs([...jobs, newJob]);
      setFormData({ pickup: '', dropoff: '', notes: '' });
    } catch (err) {
      setError('Failed to create job request.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Customer Dashboard</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Pickup Location:</label>
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Drop-Off Location:</label>
          <input
            type="text"
            name="dropoff"
            value={formData.dropoff}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Notes/Instructions:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007BFF', color: '#fff', border: 'none' }}>
          Request Haul
        </button>
      </form>
      <div>
        <h3>Your Job Requests</h3>
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} style={{ padding: '0.75rem', border: '1px solid #ddd', marginBottom: '0.75rem' }}>
              <p><strong>Pickup:</strong> {job.pickup}</p>
              <p><strong>Drop-off:</strong> {job.dropoff}</p>
              <p><strong>Status:</strong> {job.status || 'Pending'}</p>
            </div>
          ))
        ) : (
          <p>No job requests found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
