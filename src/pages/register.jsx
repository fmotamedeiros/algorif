import Head from 'next/head';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import * as Yup from 'yup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AuthService } from '../services/auth';
import CustomTextField from '../components/customTextField';


const Register = () => {
    const auth = getAuth();
    const router = useRouter();


    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            city: '',
            state: '',
            teacher: false,
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            userName: Yup
                .string()
                .max(255)
                .required('UserName is required'),
            password: Yup
                .string()
                .max(255)
                .min(6, "Senha muito fraca")
                .required('Password is required'),
            state: Yup
                .string()
                .max(255)
                .required('State is required'),
            city: Yup
                .string()
                .max(255)
                .required('City is required'),
            teacher: Yup
                .boolean(),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'This field must be checked'
                )
        }),
        onSubmit: async () => {
            setIsSubmitting(true);

            try {

                await AuthService.register(formik.values, auth);
                router.push('/login');

            } catch (error) {

                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == 'auth/email-already-in-use') {
                    document.querySelector("#error-message").innerHTML = "Email já está em uso";
                } else if (errorCode == 'auth/invalid-email') {
                    document.querySelector("#error-message").innerHTML = "Email inválido";
                } else {
                    alert(errorMessage);
                }

                console.log(error);

            }

            setIsSubmitting(false);

        }
    });

    return (
        <>
            <Head>
                <title>
                    Registrar-se
                </title>
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
                    <NextLink
                        href="/"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NextLink>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Criar uma nova conta
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Use seu email para criar uma nova conta
                            </Typography>
                        </Box>
                        <CustomTextField
                            formik={formik}
                            label="UserName"
                            name="userName"
                        />
                        <CustomTextField
                            formik={formik}
                            label="Email Address"
                            name="email"
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
                        <div className='block sm:flex gap-3'>
                            <CustomTextField
                                formik={formik}
                                label="State"
                                name="state"
                            />
                            <TextField
                                error={Boolean(formik.touched.city && formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                fullWidth
                                label="City"
                                margin="normal"
                                name="city"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                variant="outlined"
                            />
                        </div>
                        <div id="error-message" className='text-red-500 p-1'></div>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                ml: -1
                            }}
                        >
                            <div>
                                <div className='flex items-center'>
                                    <Checkbox
                                        checked={formik.values.teacher}
                                        name="teacher"
                                        onChange={formik.handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Você é um professor
                                    </Typography>
                                </div>

                                <div className='flex items-center'>
                                    <Checkbox
                                        checked={formik.values.policy}
                                        name="policy"
                                        onChange={formik.handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Eu li os
                                        {' '}
                                        <NextLink
                                            href="#"
                                            passHref
                                        >
                                            <Link
                                                color="primary"
                                                underline="always"
                                                variant="subtitle2"
                                            >
                                                Termos e Condições
                                            </Link>
                                        </NextLink>
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        {Boolean(formik.touched.teacher && formik.errors.teacher) && (
                            <FormHelperText error>
                                {formik.errors.teacher}
                            </FormHelperText>
                        )}
                        {Boolean(formik.touched.policy && formik.errors.policy) && (
                            <FormHelperText error>
                                {formik.errors.policy}
                            </FormHelperText>
                        )}
                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Inscreva-se agora
                            </Button>
                        </Box>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            Tem uma conta?
                            {' '}
                            <NextLink
                                href="/login"
                                passHref
                            >
                                <Link
                                    variant="subtitle2"
                                    underline="hover"
                                >
                                    Entrar
                                </Link>
                            </NextLink>
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Register;
