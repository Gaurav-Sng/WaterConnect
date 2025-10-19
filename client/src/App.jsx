// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/auth/Login';
import {Signup} from './pages/auth/Signup'
import UserDashboard from './pages/user/userDashboard';
import VendorDashboard from './pages/suppliers/SupplierDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signup' element={<Signup/>}/>
        
        {/* Protected Routes (add authentication later) */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/supplier" element={<VendorDashboard />} />
        
        {/* Additional Routes */}
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        
        {/* 404 Catch All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;