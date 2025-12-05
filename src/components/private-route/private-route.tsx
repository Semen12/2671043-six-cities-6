import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../const';
type PrivateRouteProps={
  authStatus: AuthStatus;
  children: React.ReactNode;
}
export const PrivateRoute = ({authStatus, children}:PrivateRouteProps)=>(authStatus === AuthStatus.Auth) ? children : <Navigate to="/login" />;
