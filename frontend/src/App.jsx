import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import AddExpense from './pages/AddExpense';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuth } from './context/AuthContext';

const GOOGLE_CLIENT_ID = "120848837437-r3vc51je50hah2m8vknpdrsmskhc94pg.apps.googleusercontent.com";

const App = () => {
  const [mode, setMode] = React.useState('light');
  const { user } = useAuth();

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#fb923c', // Orange-400 (Lighter)
      },
      secondary: {
        main: '#fdba74', // Orange-300 (Softer)
      },
      background: {
        default: mode === 'light' ? '#f8fbfc' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#1e293b',
      }
    },
    typography: {
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' }, // Modern button style
    },
    shape: {
      borderRadius: 12, // More rounded corners
    }
  }), [mode]);

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

          {user ? (
            <Route path="/*" element={
              <Layout mode={mode} toggleMode={toggleMode}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/add" element={<AddExpense />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            } />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;



