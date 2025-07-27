import React, { useEffect, useState } from 'react';
import { fetchAdminData } from '../utils/API';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const adminData = await fetchAdminData();
        setData(adminData);
      } catch (err) {
        setError('Failed to load admin data.');
      }
    };
    loadData();
  }, []);

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>
      {data ? (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Total Jobs:</strong> {data.totalJobs}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Drivers:</strong> {data.driverCount}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Fleet Status:</strong> {data.fleetStatus}
          </div>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
