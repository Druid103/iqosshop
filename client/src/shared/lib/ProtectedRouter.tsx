import type { JSX } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from './Hooks';

type ProtectedRoutePropsT = {
  children?: JSX.Element;
  redirectTo?: string;
  isAllowed: boolean;
  allowedRoles?: string[];
};

export default function ProtectedRoute({
  children,
  redirectTo = '/',
  isAllowed,
  allowedRoles,
}: ProtectedRoutePropsT): JSX.Element {
  const auth = useAppSelector((store) => store.auth.data);
  const hasRoleAccess = allowedRoles ? allowedRoles.includes(auth.user?.role ?? '') : true;
  if (!isAllowed || !hasRoleAccess) return <Navigate to={redirectTo} replace />;
  return children ?? <Outlet />;
}