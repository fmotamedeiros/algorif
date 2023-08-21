import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsAccountDelete } from '../components/settings/settingsAccountDelete';
import { SettingsPassword } from '../components/settings/settings-password';

const Settings = () => {

    return (
        <>
            <Head>
                <title>
                    Settings
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Settings
                    </Typography>
                    <SettingsPassword />
                    <Box sx={{ pt: 3 }}>
                        <SettingsAccountDelete />
                    </Box>
                </Container>
            </Box>
        </>
    )
};

Settings.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Settings;
