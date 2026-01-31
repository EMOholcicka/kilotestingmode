import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Layout from './Layout';

const ProtectedLayout = () => {
  const token = useAuthStore(state => state.token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout><Outlet /></Layout>;
};

export default ProtectedLayout;