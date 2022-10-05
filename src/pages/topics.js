import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { Exercices } from '../components/quests/exercices'


const Settings = () => (
  <>
    <Head>
      <title>
        Exercícios
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container>
        <Exercices />
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
