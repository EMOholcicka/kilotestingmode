import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ActivityList from './pages/ActivityList';
import ActivityDetail from './pages/ActivityDetail';
import ActivityForm from './pages/ActivityForm';
import Profile from './pages/Profile';
import TrainingPlan from './pages/TrainingPlan';
import ProtectedLayout from './components/ProtectedLayout';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="activities" element={<ActivityList />} />
          <Route path="activities/:id" element={<ActivityDetail />} />
          <Route path="activities/new" element={<ActivityForm />} />
          <Route path="activities/:id/edit" element={<ActivityForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="training-plans" element={<TrainingPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
