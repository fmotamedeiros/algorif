import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useContext, useEffect, useState } from 'react';
import { GetContext } from '../contexts/getFirebaseContext';

const Account = () => {
  const [coders, setCoders] = useState(null)
  const getContext = useContext(GetContext);

  const datasUsers = () => {
    getContext.getUserDetails().then((value) =>
      setCoders(value)
    ).catch(console.error)

  }

  useEffect(() => {
    datasUsers();

  }, []);

  if (coders) {
    return(
    <>
      <Head>
        <title>
          Account
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Account
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
  )} return <>Carregando</>
}
Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
