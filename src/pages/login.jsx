import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, Typography } from '@mui/material';
//import { Google as GoogleIcon } from '../icons/google';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from '../contexts/auth-context';
import { useContext, useState } from 'react';
import { Logo } from '../components/logo';
import CustomTextField from '../components/customTextField';

const Login = () => {
    const authContext = useContext(AuthContext);
    //const provider = new GoogleAuthProvider()
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            email: '',
            password: ''
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
                    document.querySelector("#error-message").innerHTML = "Email e/ou Senha Incorretos";
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
                    <form>
                        <Box sx={{ my: 1 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                <div className='flex'>
                                    <Logo viewWidth={1660} width={552} height={150} imageWidth={800} />
                                </div>
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
                        <CustomTextField
                            label="Email Address"
                            name="email"
                            onBlur={formik.handleBlur}
                            type="email"
                            formik={formik}
                        />
                        <CustomTextField
                            label="Password"
                            name="password"
                            onBlur={formik.handleBlur}
                            type="password"
                            formik={formik}
                        />
                        <div id="error-message" className='text-red-500 p-1'></div>
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    formik.handleSubmit();
                                    setIsSubmitting(true);
                                    setTimeout(() => {
                                        setIsSubmitting(false);
                                    }, 2000);
                                }}
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