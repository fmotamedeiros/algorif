import { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { AuthContext } from '../../contexts/auth-context';
import { useRouter } from 'next/router';

export const AccountProfileDetails = (props) => {

  const router = useRouter()

  const authContext = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      userName: props.coders.userName,
      email: props.coders.email,
      phone: props.coders.phone,
      state: props.coders.state,
      city: props.coders.city
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
      state: Yup
        .string()
        .max(255)
        .required('State is required'),
      city: Yup
        .string()
        .max(255)
        .required('City is required'),
      phone: Yup
        .number()
        .max(11)
    }),
    onSubmit: async () => {
      await authContext.setUserDetails(formik.values.email, formik.values.userName, formik.values.state, formik.values.city, formik.values.phone)
      router.reload()
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the complete name"
                label="Complete Name"
                name="userName"
                onChange={formik.handleChange}
                required
                value={formik.values.userName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={formik.handleChange}
                type="number"
                value={formik.values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="State"
                name="state"
                onChange={formik.handleChange}
                required
                value={formik.values.state}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select City"
                name="city"
                onChange={formik.handleChange}
                required
                value={formik.values.city}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
