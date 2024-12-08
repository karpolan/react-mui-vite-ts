import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { AppButton, AppLink } from '@/components';

/**
 * Renders "Demo Section" for AppLink component
 * @component DemoLinks
 */
const DemoLinks = () => {
  return (
    <Card>
      <CardHeader
        title="AppLink"
        subheader="A smart Link wrapper that opens external links in new Browser's tab, supports colors and noWrap."
      />
      <CardContent sx={{ px: 1, py: 0 }}>
        <Stack spacing={2}>
          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={1}>
            <AppLink to="/">Internal Link</AppLink>
            <AppLink to="/" openInNewTab>
              Internal Link in New Tab
            </AppLink>
            <AppLink href="//karpolan.com">External Link</AppLink>
            <AppLink href="//karpolan.com" openInNewTab={false}>
              External Link in Same Tab
            </AppLink>
          </Stack>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" spacing={1}>
            <AppLink noWrap>MUI default</AppLink>
            <AppLink color="inherit" noWrap>
              Color inherit
            </AppLink>
            <AppLink color="primary" noWrap>
              Color primary
            </AppLink>
            <AppLink color="secondary" noWrap>
              Color secondary
            </AppLink>
            <AppLink color="textPrimary" noWrap>
              Color textPrimary
            </AppLink>
            <AppLink color="textSecondary" noWrap>
              Color textSecondary
            </AppLink>

            <AppLink color="warning" noWrap>
              Color warning
            </AppLink>
            <AppLink color="info" noWrap>
              Color info
            </AppLink>
            <AppLink color="success" noWrap>
              Color success
            </AppLink>
            <AppLink color="error" noWrap>
              Color error
            </AppLink>
          </Stack>

          <Stack alignItems="center">
            <AppButton to="/" size="small" label="as Default Button" />
            <AppButton to="/" size="small" color="primary" label="as Primary Button" />
            <AppButton to="/" size="small" color="secondary" label="as Secondary Button" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DemoLinks;
