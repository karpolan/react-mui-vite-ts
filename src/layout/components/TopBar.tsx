import { FunctionComponent, ReactNode } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface Props {
  endNode?: ReactNode;
  startNode?: ReactNode;
  title?: string;
}

/**
 * Renders TopBar composition
 * @component TopBar
 */
const TopBar: FunctionComponent<Props> = ({ endNode, startNode, title = '', ...restOfProps }) => {
  return (
    <AppBar
      component="div"
      sx={
        {
          // boxShadow: 'none', // Uncomment to hide shadow
        }
      }
      {...restOfProps}
    >
      <Toolbar disableGutters sx={{ paddingX: 1 }}>
        {startNode}

        {/* Note: We need to render some content in the Toolbar even when the .title is empty, 
        because it's required for the layout to work properly. */}
        <Typography
          component="strong" // For SEO
          sx={{
            marginX: 1,
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
          variant="h6"
        >
          {title}
        </Typography>
        {endNode}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
