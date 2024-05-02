import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useAppStore } from '@/store';
import { useEventLogout } from '@/hooks/auth';
import { AppButton, AppLink, AppView } from '@/components';
import NotImplementedView from '../NotImplementedView';
import { sessionStorageSet } from '@/utils/sessionStorage';

const AuthView = () => {
  const navigate = useNavigate();
  const [, dispatch] = useAppStore();
  const onLogout = useEventLogout();

  const onLogin = () => {
    // TODO: AUTH: Sample of access token store, replace next line in real application
    sessionStorageSet('access_token', 'TODO:_save-real-access-token-here');

    dispatch({ type: 'LOG_IN' });
    navigate('/', { replace: true }); // Redirect to home page without ability to go back
  };

  return (
    <AppView>
      <NotImplementedView name="Auth" />

      <Stack direction="row" justifyContent="center">
        <AppButton color="primary" onClick={onLogin}>
          Emulate User Login
        </AppButton>
        <AppButton color="secondary" onClick={onLogout}>
          Logout User
        </AppButton>
      </Stack>

      <div>
        The source code is available at{' '}
        <AppLink href="https://github.com/karpolan/react-mui-vite-ts">
          Git Hub
        </AppLink>
      </div>
    </AppView>
  );
};

export default AuthView;
