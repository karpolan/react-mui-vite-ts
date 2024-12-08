import { Typography } from '@mui/material';
import { IS_DEBUG } from '@/config';
import { AppView } from '@/components';
import DemoDialogs from './components/DemoDialogs';
import DemoLinks from './components/DemoLinks';
import DemoButtons from './components/DemoButtons';
import DemoIconButtons from './components/DemoIconButtons';
import DemoIcons from './components/DemoIcon';
import DemoTypography from './components/DemoTypography';

/**
 * Renders Development tools
 * url: /dev
 * @page Dev
 */
const DevView = () => {
  if (!IS_DEBUG) return null; // Hide content of this page on production

  return (
    <AppView>
      <Typography variant="h1">Development Tools</Typography>
      <Typography variant="h4" component="h2">
        You can debug components on this page...
      </Typography>
      <Typography variant="h3">No need for a Storybook :)</Typography>

      <DemoIcons />
      <DemoButtons />
      <DemoIconButtons />
      <DemoLinks />
      <DemoDialogs />
      <DemoTypography />
    </AppView>
  );
};

export default DevView;
