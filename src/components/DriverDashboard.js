import React, { useEffect, useState } from 'react';
import { fetchDriverJobs, updateJobStatus } from '../utils/API';

const DriverDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobData = await fetchDriverJobs();
        setJobs(jobData);
      } catch (err) {
        setError('Unable to load job assignments.');
      }
    };
    loadJobs();
  }, []);

  const handleStatusUpdate = async (jobId, newStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      setJobs(jobs.map(job => (job.id === jobId ? { ...job, status: newStatus } : job)));
    } catch (err) {
      alert('Failed to update job status.');
    }
  };

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Driver Dashboard</h2>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #ddd' }}>
            <p><strong>Job:</strong> {job.description}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <button
              onClick={() => handleStatusUpdate(job.id, 'in-progress')}
              style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
            >
              Start
            </button>
            <button
              onClick={() => handleStatusUpdate(job.id, 'completed')}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#17a2b8', color: '#fff', border: 'none' }}
            >
              Complete
            </button>
          </div>
        ))
      ) : (
        <p>No jobs assigned at the moment.</p>
      )}
    </div>
  );
};

export default DriverDashboard;
