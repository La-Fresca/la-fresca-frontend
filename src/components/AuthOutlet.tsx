import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const auth = useAuthUser();
  const location = useLocation();

  if (auth != null && allowedRoles.includes((auth as { role: string }).role)) {
    return <Outlet />;
  }
  if (auth == null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/unauthorized" replace />;
  }
};

export default RequireAuth;
