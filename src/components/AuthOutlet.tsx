import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const auth = useAuthUser();
  const location = useLocation();
  return auth != null &&
    allowedRoles.includes((auth as { role: string }).role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
