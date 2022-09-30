import Head from 'next/head';
import { Box, Container } from '@mui/material';
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
      <Container>
        <RankerListToolbar />
        <Box sx={{ mt: 3 }}>
          <RankerListResults />
        </Box>
      </Container>
    </Box>
  </>
);
RankingTotal.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RankingTotal;