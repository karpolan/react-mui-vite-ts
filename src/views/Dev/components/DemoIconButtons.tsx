'use client';
import { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { Card, CardContent, CardHeader, Snackbar, Tooltip } from '@mui/material';
import AppIconButton, { AppIconButtonProps } from '@/components/common/AppIconButton/AppIconButton';

/**
 * Same as <AppIconButton/> but with onClick handler that copies JSX code to Clipboard
 */
const InternalAppIconButton = (props: AppIconButtonProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onClick = () => {
    const { icon, color, href, size, title, to } = props;

    const propsToPass = [
      color && `color="${color}"`,
      href && `href="${href}"`,
      icon && `icon="${icon}"`,
      size && `size="${size}"`,
      title && `title="${title}"`,
      to && `to="${to}"`,
    ]
      .filter(Boolean)
      .join(' ');

    const code = `<AppIconButton ${propsToPass} />`;
    copyToClipboard(code);
    setSnackbarOpen(true); // Show snackbar
    setTimeout(() => setSnackbarOpen(false), 3000); // Hide snackbar after small delay
  };

  return (
    <>
      <AppIconButton {...props} onClick={onClick} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: { display: 'block', textAlign: 'center' },
        }}
        open={snackbarOpen}
        message="JSX code copied to Clipboard"
      />
    </>
  );
};

/**
 * Renders "Demo Section" for AppIconButton component
 * @component DemoIconButtons
 */
const DemoIconButtons = () => {
  return (
    <Card>
      <CardHeader
        title="AppIconButton"
        subheader="Composition of IconButton + Tooltip with SVG icon specified by name. Click to copy JSX code."
      />
      <CardContent sx={{ px: 1, py: 0 }}>
        <InternalAppIconButton icon="default" title="Default icon, no color specified" />
        <InternalAppIconButton icon="close" color="primary" title="Close icon with Primary color" />
        <InternalAppIconButton icon="menu" color="secondary" title="Menu icon with Secondary color" />
        <InternalAppIconButton icon="settings" color="error" title="Settings icon with Error color" />
        <InternalAppIconButton icon="search" color="warning" title="Search icon with Warning color" />
        <InternalAppIconButton icon="info" color="info" title="Info icon with Info color" />
        <InternalAppIconButton icon="home" color="success" title="Home icon with Success color" />
        <InternalAppIconButton icon="account" color="inherit" title="Account icon with Inherit color" />

        <InternalAppIconButton
          icon="visibilityOff"
          color="#FF8C00"
          title="VisibilityOff icon with DarkOrange (#FF8C00) color"
        />
        <InternalAppIconButton
          icon="visibilityOn"
          color="rgb(50, 205, 50)"
          title="VisibilityOn icon with LimeGreen (rgb(50, 205, 50)) color"
        />

        <Tooltip title="Disabled Close icon with Secondary color">
          <span>
            <AppIconButton icon="close" color="secondary" disabled />
          </span>
        </Tooltip>

        <AppIconButton
          color="secondary"
          icon="close"
          size="large"
          to="/about"
          title="Large icon with Secondary color as Internal link"
        />
        <AppIconButton
          color="#F0F"
          href="https://karpolan.com"
          icon="close"
          size="small"
          title="Small icon with Custom color as External link"
        />
        <InternalAppIconButton icon="menu" color="primary" size="small" title="Small Menu icon with Primary color" />
        <InternalAppIconButton
          color="primary"
          icon="default"
          title="Default icon with Primary color and Arrow tooltip"
          tooltipProps={{ arrow: true }}
        />
      </CardContent>
    </Card>
  );
};

export default DemoIconButtons;
