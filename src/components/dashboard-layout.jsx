import { DashboardMinimalSideBar } from './dashboard-minimal-sidebar';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardNavbar } from './dashboard-navbar';
import { styled } from '@mui/material/styles';
import { AuthGuard } from './auth-guard';
import { Box } from '@mui/material';
import { useState } from 'react';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
        paddingLeft: 80
    }
}));

export const DashboardLayout = ({ children }) => {
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

            <DashboardNavbar
                onSidebarOpen={() => setSidebarOpen(true)}
            />

            <div className='hidden lg:block'>
                <DashboardMinimalSideBar
                    onSidebarOpen={() => setSidebarOpen(true)}
                />
            </div>

            <DashboardSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </AuthGuard>
    );
};
