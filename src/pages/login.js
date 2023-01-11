import Head from 'next/head';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
//import { Google as GoogleIcon } from '../icons/google';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth, AuthContext } from '../contexts/auth-context';
import { useContext } from 'react';

const Login = () => {
  const authContext = useContext(AuthContext);
  //const provider = new GoogleAuthProvider()
  const router = useRouter()

  // function handleGoogleSignIn() {
  
  //   signInWithPopup(auth, provider)
  //   .then((response) => {
  //     authContext.signIn(response.user)
  //     router.push('/')
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  const formik = useFormik({
    initialValues: {
      email: 'masiocesar@gmail.com',
      password: '123456'
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('O email deve ser válido!')
        .max(255)
        .required('O email é obrigatório!'),
      password: Yup
        .string()
        .max(255)
        .required('A senha é obrigatória!')
    }),
    onSubmit: () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
        .then(async (response) => {
          //console.log(JSON.stringify(response));
          localStorage.setItem("@AuthFirebase:metadata", JSON.stringify(response.user))
          authContext.signIn(response.user);
          Router
            .push('/')
            .catch(console.error);
        })
        .catch((error) => {
          console.log(error);
          router.reload()
          alert('Email e/ou Senha Incorretos')
        });
    }
  });

  return (
    <>
      <Head>
        <title>Algorif</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 1 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                <img src='/logo.png' className='w-full p-5'/>
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Faça Login no Plataforma do Algorif
              </Typography>
            </Box>
            {/* <Grid
              item
              xs={12}
              md={6}
            >
              <Button
                color="error"
                fullWidth
                onClick={handleGoogleSignIn}
                size="large"
                startIcon={<GoogleIcon />}
                variant="contained"
              >
                Entre com o Google
              </Button>
            </Grid> 
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                ou entre com seu endereço de email
              </Typography>
            </Box> */}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Entrar
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Ainda não tem conta?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Registrar-se
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;