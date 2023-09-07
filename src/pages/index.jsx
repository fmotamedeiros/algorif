import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import { DifficultyRate } from '../components/dashboard/difficultyRate';
import { TasksWeekend } from '../components/dashboard/tasksWeekend';
import { TasksTopic } from '../components/dashboard/tasksTopic';
import { Ranking } from '../components/dashboard/ranking';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => (
  <>
    <Head>
      <title>
        Painel inicial 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <div className='px-[5%]'>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={7}
            sm={12}
            xl={8}
            xs={12}
          >
            <DifficultyRate sx={{ height: '100%' }} />
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
      </div>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
