// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

// Simplified version without jwt-decode
const ProtectedRoute = ({ children, allowedRoles }) => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (err) {
    console.warn('Invalid user in localStorage');
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;