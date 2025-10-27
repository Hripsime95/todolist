import { Login } from '@/features/todolists/ui/Todolists/Login/Login';
import { Route, Routes } from 'react-router';
import { PageNotFound } from '../components';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '../hooks';
import { selectIsLoggined } from '@/features/auth/model/auth-slice';
import { Main } from '@/app/Main';

export const Path = {
  Main: '/',
  Login: 'login',
  NotFound: '*',
} as const;

export const Routing = () => {
  const isLoggined = useAppSelector(selectIsLoggined);
  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggined} redirectPath={Path.Login}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggined} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
