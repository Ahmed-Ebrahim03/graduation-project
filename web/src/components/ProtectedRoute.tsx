import { useAtom } from 'jotai';
import { Navigate } from 'react-router-dom';
import { isAuthenticatedAtom } from '../store/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}