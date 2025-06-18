import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const Header: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoginOpen(true);
  };

  const handleSignup = () => {
    setIsSignupOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // login logic
    setIsLoginOpen(false);
    setIsLoggedIn(true);
  };

  const handleSignupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // signup logic
    setIsSignupOpen(false);
    setIsLoggedIn(true);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Agent Automation
          </Typography>
          <Box>
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleSignup}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleLoginSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsLoginOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Login</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <DialogTitle>Sign Up</DialogTitle>
        <form onSubmit={handleSignupSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSignupOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Sign Up</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Header; 