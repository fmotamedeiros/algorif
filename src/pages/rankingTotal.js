import Head from 'next/head';
import { Box } from '@mui/material';
import { RankerListResults } from '../components/ranker/ranker-list-results';
import { RankerListToolbar } from '../components/ranker/ranker-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const RankingTotal = () => (
  <>
    <Head>
      <title>
        Ranking
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <div className='px-[5%]'>
        <RankerListToolbar />
        <Box sx={{ mt: 3 }}>
          <RankerListResults />
        </Box>
      </div>
    </Box>
  </>
);
RankingTotal.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RankingTotal;