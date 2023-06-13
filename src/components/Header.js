import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Link from 'next/link'

const navItems = [
  { displayName: 'Usuarios', route: 'users' }
];

export default function Header() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Ingress
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button component={Link} href={`/${item.route}`} key={item.displayName} sx={{ color: '#fff' }}>
                {item.displayName}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
