import { Login } from '@/features/todolists/ui/Todolists/Login/Login';
import { Route, Routes } from 'react-router';
import { PageNotFound } from '../components';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '../hooks';
import { selectIsLoggedIn } from '@/features/auth/model/auth-slice';
import { Main } from '@/app/Main';

export const Path = {
  Main: '/',
  Login: 'login',
  NotFound: '*',
} as const;

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Routes>
      <Route
        path={Path.Main}
        element={
          <ProtectedRoute isAllowed={isLoggedIn} redirectPath={Path.Login}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  );
};
