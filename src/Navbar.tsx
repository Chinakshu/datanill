import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ fontSize: '2rem', fontWeight: 'bold' }}
          >
            DataNill
          </Button>
        </Box>
        <Button color="inherit" component={RouterLink} to="/createcampaign">
          Campaigns
        </Button>
        <Button color="inherit" component={RouterLink} to="/operations">
          Submit Data
        </Button>
        <Button color="inherit" component={RouterLink} to="/blind-inference">
          Blind Validation
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
