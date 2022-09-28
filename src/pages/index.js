import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { NextTasks } from '../components/dashboard/nextTasks';
import { TasksWeekend } from '../components/dashboard/tasksWeekend';
import { TasksTopic } from '../components/dashboard/tasksTopic';
import { Ranking } from '../components/dashboard/ranking';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Dashboard
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={7}
            sm={14}
            xl={8}
            xs={12}
          >
            <NextTasks sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            xl={4}
            lg={5}
            sm={12}
            xs={12}
          >
            <TasksTopic sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={7}
            md={12}
            xl={8}
            xs={12}
          >
            <TasksWeekend sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={5}
            md={12}
            xl={4}
            xs={12}
          >
            <Ranking sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
