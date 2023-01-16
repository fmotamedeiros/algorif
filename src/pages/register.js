import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SetContext } from '../contexts/setFirebase';
import { useContext, useRef, useState } from 'react';

import emailjs from '@emailjs/browser';

const Register = () => {
  const form = useRef();
  const setContext = useContext(SetContext);

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
    onSubmit: () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
        .then(async () => {
          await setContext.setRegisterUser(formik.values)

          if(formik.values.teacher == true){
            emailjs.sendForm('service_1t2y2qd', 'template_i9ynk3d', form.current, 'o3FH4JUttrmR411Z4')
            .then((result) => {
              console.log(result.text);
            }, (error) => {
              console.log(error.text);
            });
          }

          Router
            .push('/login')
            .catch(console.error);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            document.querySelector("#error-message").innerHTML = "Email já está em uso";
          } if (errorCode == 'auth/invalid-email'){
            document.querySelector("#error-message").innerHTML = "Email inválido";
          } if (errorCode == 'auth/weak-password'){
            document.querySelector("#error-message").innerHTML = "Senha muito fraca";
          }
        });
    }
  });

  return (
    <>
      <Head>
        <title>
          Register
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
          <form ref={form}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new account
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              label="UserName"
              margin="normal"
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.userName}
              variant="outlined"
            />
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
            <div className='block sm:flex gap-3'>
              <TextField
                error={Boolean(formik.touched.state && formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                fullWidth
                label="State"
                margin="normal"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
                variant="outlined"
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
                    I have read the
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
                        Terms and Conditions
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
                onClick={() => {
                  formik.handleSubmit();
                  setIsSubmitting(true);
                  setTimeout(() => {
                      setIsSubmitting(false);
                  }, 3000);
                }}
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
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