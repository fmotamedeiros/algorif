import { useState } from 'react';
import { Box } from '@mui/material';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardMinimalSideBar } from './dashboard-minimal-sidebar';
import { AuthGuard } from './auth-guard';
import { styled } from '@mui/material/styles';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    paddingLeft: 80
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
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
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <div className='hidden lg:block'>
      <DashboardMinimalSideBar onSidebarOpen={() => setSidebarOpen(true)} /> 
      </div>
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </AuthGuard>
  );
};
