import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
})

const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2fabb4' },
    secondary: { main: '#ffffff' }
  },
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    fontStyle: 'normal',
    h1: {
      fontSize: '34px',
      fontWeight: 'normal',
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px'
      }
    },
    h2: {
      fontSize: '35px',
      fontWeight: 'bold',
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '31px'
      }
    },
    h3: {
      fontSize: '30px',
      fontWeight: 'normal',
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '26px'
      }
    },
    h4: {
      fontSize: '32px',
      fontWeight: 'normal',
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '28px'
      }
    },
    body1: {
      fontSize: '20px',
      fontWeight: 'lighter',
      color: '#4a4a4a',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px'
      }
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'lightgrey'
        }
      }
    }
  }
})

export default responsiveFontSizes(customTheme)
