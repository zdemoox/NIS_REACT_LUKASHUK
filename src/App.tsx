import React from 'react';
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import Dashboard from './pages/Dashboard';
import { EventLogProvider } from './context/EventContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
    },
    background: {
      default: '#020617',
      paper: '#020617',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventLogProvider>
        <div className="app-root">
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ px: 2, pt: 1 }}
          >
            <Toolbar disableGutters sx={{ gap: 1 }}>
              <PetsIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Кибер‑Зоопарк 2077
              </Typography>
            </Toolbar>
          </AppBar>

          <Dashboard />
        </div>
      </EventLogProvider>
    </ThemeProvider>
  );
};

export default App;
