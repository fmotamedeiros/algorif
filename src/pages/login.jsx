import { Box, Button, Container, Link, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import CustomTextField from '../components/customTextField';
import { AuthContext } from '../contexts/auth-context';
import { useContext, useState } from 'react';
import { Logo } from '../components/logo';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import * as Yup from 'yup';


const Login = () => {
    const authContext = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .max(255)
                .email('O e-mail deve ser válido')
                .required('O e-mail é obrigatório'),
            password: Yup
                .string()
                .max(255)
                .required('Senha é obrigatória')
        }),
        onSubmit: () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
                .then(async (response) => {
                    localStorage.setItem("@AuthFirebase:metadata", JSON.stringify(response.user))
                    authContext.signIn(response.user);
                    Router
                        .push('/')
                        .catch(console.error);
                })
                .catch((error) => {
                    console.log(error);
                    document.querySelector("#error-message").innerHTML = "E-mail e/ou senha incorreto(s)";
                });
        }
    });

    return (
        <>
            <Head>
                <title>AlgorIF</title>
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
                                    <Logo
                                        viewWidth={1660}
                                        width={552}
                                        height={150}
                                        imageWidth={800}
                                    />
                                </div>
                            </Typography>

                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Faça login na plataforma do AlgorIF
                            </Typography>
                        </Box>

                        <CustomTextField
                            onBlur={formik.handleBlur}
                            formik={formik}
                            label="Endereço de e-mail"
                            name="email"
                            type="email"
                            required

                        />
                        <CustomTextField
                            onBlur={formik.handleBlur}
                            formik={formik}
                            label="Senha"
                            name="password"
                            type="password"
                            required
                        />

                        <div id="error-message" className='text-red-500 p-1'></div>

                        <Box sx={{ py: 2 }}>
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                fullWidth
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
