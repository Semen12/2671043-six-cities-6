import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../const';
type PrivateRouteProps={
  authStatus: keyof typeof AuthStatus;
  children: React.ReactNode;
}
export const PrivateRoute = ({authStatus, children}:PrivateRouteProps)=>(authStatus === 'Auth') ? children : <Navigate to="/login" />;
