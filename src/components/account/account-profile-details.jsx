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
        .required('Usuário é obrigatório'),
      state: Yup
        .string()
        .max(255)
        .required('Estado é obrigatório'),
      city: Yup
        .string()
        .max(255)
        .required('Cidade é obrigatório'),
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
          subheader="As informações podem ser editadas"
          title="Perfil"
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
                helperText="Por favor especifique o nome completo"
                label="Nome completo"
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
                label="Endereço de e-mail"
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
                label="Número de telefone"
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
                label="Estado"
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
                label="Cidade"
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
            Salvar detalhes
          </Button>
        </Box>
      </Card>
    </form>
  );
};
