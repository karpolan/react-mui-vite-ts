import { Card, CardActions, CardContent, CardHeader } from '@mui/material';
import { AppButton, AppView } from '@/components';
import { getCurrentVersion } from '@/utils';

/**
 * Renders "About" view
 * url: /about
 * @page About
 */
const AboutView = () => {
  return (
    <AppView>
      <Card>
        <CardHeader title="Application _TITLE_ here..." subheader={`Version ${getCurrentVersion()}`} />
        <CardContent>TODO: Detailed _DESCRIPTION_ of the application here...</CardContent>
        <CardActions>
          <AppButton to="/" color="primary">
            OK
          </AppButton>
        </CardActions>
      </Card>
    </AppView>
  );
};

export default AboutView;
