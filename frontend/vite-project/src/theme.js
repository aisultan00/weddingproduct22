import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      light: '#8B93F9',
      dark: '#3730A3',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#C026D3',
      light: '#F0ABFC',
      dark: '#86198F',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#0891B2'
    },
    success: {
      main: '#1FB457'
    },
    warning: {
      main: '#F59E0B'
    },
    error: {
      main: '#EF4444'
    },
    text: {
      primary: '#0E1628',
      secondary: '#334155'
    },
    background: {
      default: '#EEF2FF',
      paper: '#FFFFFF'
    },
    header: {
      start: '#A5B4FC',
      mid: '#6366F1',
      end: '#D946EF',
      contrastText: '#FFFFFF'
    },
    toy: {
      wedding: {
        main: '#EC4899',
        light: '#F9A8D4',
        dark: '#BE185D',
        start: '#A78BFA',
        end: '#F472B6',
        info: '#06B6D4'
      },
      betashar: {
        main: '#C026D3',
        light: '#F0ABFC',
        dark: '#86198F',
        start: '#D946EF',
        end: '#8B5CF6',
        info: '#22D3EE'
      },
      merey: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#B45309',
        start: '#F59E0B',
        end: '#FB7185',
        info: '#06B6D4'
      },
      sundet: {
        main: '#0D9488',
        light: '#5EEAD4',
        dark: '#115E59',
        start: '#14B8A6',
        end: '#06B6D4',
        info: '#0EA5E9'
      },
      tkesers: {
        main: '#22C55E',
        light: '#86EFAC',
        dark: '#166534',
        start: '#84CC16',
        end: '#10B981',
        info: '#06B6D4'
      },
      uzatus: {
        main: '#2563EB',
        light: '#93C5FD',
        dark: '#1E3A8A',
        start: '#3B82F6',
        end: '#38BDF8',
        info: '#22D3EE'
      }
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Ubuntu',
      'Cantarell',
      'Noto Sans',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(', '),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 }
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 6
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 700
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
});

export default theme; 