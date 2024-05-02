import { Typography } from '@mui/material';
import { AppLink, AppView } from '@/components';

/**
 * Renders "Welcome" view
 * url: /
 * @page Welcome
 */
const WelcomeView = () => {
  return (
    <AppView>
      <Typography variant="h4">Welcome to React App with MUI</Typography>

      <div>This is Welcome page, put your content here....</div>
      <div>
        Take a look on samples of components at{' '}
        <AppLink to="/dev">Debug Page</AppLink>
      </div>
      <div>
        The source code is available at{' '}
        <AppLink href="https://github.com/karpolan/react-mui-vite-ts">
          Git Hub
        </AppLink>
      </div>
    </AppView>
  );
};

export default WelcomeView;
