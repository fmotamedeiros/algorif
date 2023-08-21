import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography } from '@mui/material';
import CustomTextField from '../components/customTextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthService } from '../services/auth';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import Head from 'next/head';
import * as Yup from 'yup';


const Register = () => {
    const auth = getAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            confirmationPassword: '',
            city: '',
            state: '',
            teacher: false,
            policy: false
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Deve ser um e-mail válido')
                .max(255)
                .required('E-mail é obrigatório'),
            userName: Yup
                .string()
                .max(255)
                .required('Nome de usuário é obrigatório'),
            password: Yup
                .string()
                .max(255)
                .min(6, "Senha muito fraca")
                .required('Senha é obrigatória'),
            confirmationPassword: Yup
                .string()
                .max(255)
                .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir'),
            state: Yup
                .string()
                .max(255)
                .required('Estado é obrigatório'),
            city: Yup
                .string()
                .max(255)
                .required('Cidade é obrigatório'),
            teacher: Yup
                .boolean(),
            policy: Yup
                .boolean()
                .oneOf(
                    [true],
                    'Este campo deve ser marcado'
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
                                variant="body2"
                                gutterBottom
                            >
                                Use seu e-mail para criar uma nova conta
                            </Typography>
                        </Box>
                        <CustomTextField
                            formik={formik}
                            label="Nome de usuário"
                            name="userName"
                            required
                        />
                        <CustomTextField
                            formik={formik}
                            label="Endereço de e-mail"
                            name="email"
                            required
                        />
                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            label="Senha"
                            margin="normal"
                            name="password"
                            type="password"
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            fullWidth
                            required
                        />
                        <TextField
                            error={Boolean(formik.touched.confirmationPassword && formik.errors.confirmationPassword)}
                            helperText={formik.touched.confirmationPassword && formik.errors.confirmationPassword}
                            label="Confirmar senha"
                            margin="normal"
                            name="confirmationPassword"
                            type="password"
                            variant="outlined"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.confirmationPassword}
                            fullWidth
                            required
                        />
                        <div className='block sm:flex gap-3'>
                            <CustomTextField
                                formik={formik}
                                label="Estado"
                                name="state"
                                required
                            />
                            <TextField
                                error={Boolean(formik.touched.city && formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.city}
                                variant="outlined"
                                margin="normal"
                                label="Cidade"
                                name="city"
                                fullWidth
                                required
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
                                        onChange={formik.handleChange}
                                        name="teacher"
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body2"
                                    >
                                        Sou professor(a)
                                    </Typography>
                                </div>
                            </div>
                        </Box>

                        {Boolean(formik.touched.teacher && formik.errors.teacher) && (
                            <FormHelperText error>
                                {formik.errors.teacher}
                            </FormHelperText>
                        )}

                        <Box sx={{ py: 2 }}>
                            <Button
                                disabled={isSubmitting}
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                fullWidth
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
