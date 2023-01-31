import { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UpdateContext } from '../../contexts/updateFirebase';
import { useRouter } from 'next/router';
import CustomTextField from '../customTextField';

export const AccountProfileDetails = ({ coders }) => {

  const router = useRouter()

  const updateContext = useContext(UpdateContext);
  const formik = useFormik({
    initialValues: {
      userName: coders.userName,
      email: coders.email,
      phone: coders.phone,
      state: coders.state,
      city: coders.city
    },
    validationSchema: Yup.object({
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
        .string()
        .max(11)
    }),
    onSubmit: async () => {
      await updateContext.updateUserDetails(formik.values)
      router.reload()
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}
      autoComplete="off"
      noValidate
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
            spacing={0.5}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <CustomTextField
                formik = {formik}
                helperText="Please specify the complete name"
                label="Complete Name"
                name="userName"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CustomTextField
                disabled
                label="Email Address"
                name="email"
                formik={formik}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CustomTextField
                label="Phone Number"
                name="phone"
                type="number"
                formik={formik}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CustomTextField
                label="State"
                name="state"
                formik={formik}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CustomTextField
                label="Select City"
                name="city"
                formik={formik}
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
