import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import DatasetUpload from './pages/Dataset/DatasetUpload';
import Billing from './pages/Billing';
import Payment from './pages/DoPayment';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dataset/upload" element={<DatasetUpload />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Payment/:id" element={<Payment />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
