import { Fragment } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from '../contexts/auth-context';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { registerChartJs } from '../utils/register-chart-js';
import { theme } from '../theme';
import '../theme/globals.css'
import { GetProvider } from '../contexts/getFirebase';
import { SetProvider } from '../contexts/setFirebase';
import { UpdateProvider } from '../contexts/updateFirebase';
import { DeleteProvider } from '../contexts/deleteFirebase';

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Início
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <GetProvider>
              <SetProvider>
                <UpdateProvider>
                  <DeleteProvider>
                    <AuthConsumer>
                      {
                        (auth) => auth.isLoading
                          ? <Fragment />
                          : getLayout(<Component {...pageProps} />)
                      }
                    </AuthConsumer>
                  </DeleteProvider>
                </UpdateProvider>
              </SetProvider>
            </GetProvider>
          </AuthProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
