import { Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material';
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
      <Grid item xs={12} md={3}>
        <Card>
          <CardHeader title="Application _TITLE_ here..." subheader={`Version ${getCurrentVersion()}`} />
          <CardContent>TODO: Detailed _DESCRIPTION_ of the application here...</CardContent>
          <CardActions>
            <AppButton to="/" color="primary">
              OK
            </AppButton>
          </CardActions>
        </Card>
      </Grid>
    </AppView>
  );
};

export default AboutView;
