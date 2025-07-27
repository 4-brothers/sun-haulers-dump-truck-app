import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import DriverDashboard from './components/DriverDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </Router>
  );
}

export default App;
