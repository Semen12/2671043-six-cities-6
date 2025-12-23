import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/use-store';


type PrivateRouteProps={
  children: React.JSX.Element;
}
export const PrivateRoute = ({ children}:PrivateRouteProps):JSX.Element=>{
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (authorizationStatus === AuthorizationStatus.Auth) ? {children} : <Navigate to="/login" />;

};
