import { FunctionComponent, PropsWithChildren } from 'react';
import { Stack, StackProps } from '@mui/material';
import { CONTENT_MAX_WIDTH, CONTENT_MIN_WIDTH } from '@/components/config';
import { useIsMobile } from '@/hooks';

/**
 * Renders View container composition with limited width
 * @component AppView
 */
const AppView: FunctionComponent<PropsWithChildren<StackProps>> = ({ children, minWidth, ...restOfProps }) => {
  const isMobile = useIsMobile();
  const minWidthToRender = isMobile ? '100%' : (minWidth ?? CONTENT_MIN_WIDTH);

  return (
    <Stack alignSelf="center" gap={2} maxWidth={CONTENT_MAX_WIDTH} minWidth={minWidthToRender} {...restOfProps}>
      {children}
    </Stack>
  );
};

export default AppView;
