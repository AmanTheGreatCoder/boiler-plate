import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Palette from './palette';
import Typography from './typography';
import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

export default function ThemeCustomization({ children }) {
  const mode = 'light';
  const presetColor = 'default';
  const borderRadius = 8;
  const fontFamily = 'Roboto , sans-serif';
  const theme = Palette(mode, presetColor);
  const themeCustomShadows = customShadows(mode, theme);
  const themeTypography = Typography(theme, borderRadius, fontFamily);

  const themeOptions = useMemo(
    () => ({
      palette: theme.palette,
      mode,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px'
          }
        }
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
      custom: {
        presetColor,
        borderRadius,
        fontFamily
      }
    }),
    [theme, themeCustomShadows, themeTypography]
  );

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
