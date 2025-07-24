import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardJobSeeker from './pages/DashboardJobSeeker';
import DashboardRecruiter from './pages/DashboardRecruiter';
import Home from './pages/Home';
import JobList from './pages/JobList';
import Postjob from './pages/Postjob';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/post-job" element={<Postjob />} />
        
        <Route path="/job-seeker/dashboard" element={
          <ProtectedRoute allowedRoles={['job_seeker']}>
            <DashboardJobSeeker />
          </ProtectedRoute>
        } />
        
        <Route path="/recruiter/dashboard" element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <DashboardRecruiter />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;