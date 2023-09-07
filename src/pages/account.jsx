import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import { UserDetails } from '../requestsFirebase/allGetRequests';
import { Loader } from '../requestsFirebase/loader';

const Account = () => {
  const [coders, setCoders] = useState(null)

  UserDetails(setCoders)

  if (coders) {
    return(
    <>
      <Head>
        <title>
          Conta
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
            Conta
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile coders={coders} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails coders={coders} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )} return <Loader />
}
Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
