import { useState } from 'react';
import { Box } from '@mui/material';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { AuthGuard } from './auth-guard';

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            paddingTop: 8,
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
};
