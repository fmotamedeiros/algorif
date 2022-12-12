import Head from 'next/head';
import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { SetContext } from '../contexts/setFirebaseContext';
import { useContext } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';

const dificuldades = [
    {
        value: '',
        label: ''
    },
    {
        label: 'Iniciante'
    },
    {
        label: 'Fácil'
    },
    {
        label: 'Médio'
    },
    {
        label: 'Difícil'
    },
    {
        label: 'Expert'
    }
];

const topicos = [
    {
        label: ''
    },
    {

        label: 'Array'
    },
    {

        label: 'Array bidimensional'
    },
    {

        label: 'Decisão'
    },
    {

        label: 'Entrada e Saída'
    },
    {

        label: 'Formatação'
    },
    {
        label: 'Geometria computacional'
    },
    {

        label: 'Geral'
    },
    {

        label: 'Laço de repetição'
    },
    {

        label: 'Lógica matemática'
    },
    {

        label: 'Recursão'
    },
    {

        label: 'String'
    },
    {

        label: 'Variáveis'
    }
];


const CreateQuestion = (props) => {

    const formik = useFormik({
        initialValues: {
            topico: '',
            titulo: '',
            descricao: '',
            descricaoDetalhada: '',
            dificuldade: '',
        },
        validationSchema: Yup.object({
            topico: Yup
                .string()
                .max(255)
                .required(
                    'Tópico da questão is required'),
            titulo: Yup
                .string()
                .max(255)
                .required(
                    'Título is required'),
            descricao: Yup
                .string()
                .max(255)
                .required('Descricão is required'),
            descricaoDetalhada: Yup
                .string()
                .max(255)
                .required('Descricão detalhada is required'),
            dificuldade: Yup
                .string()
                .max(255)
                .required('Dificuldade is required'),
        }),
        onSubmit: async () => {
            await setContext.setCreateQuestion(formik.values)
            alert('Questão Cadastrada com Sucesso')
            Router.reload()
        }
    })

    const setContext = useContext(SetContext);

    return (
        <>
            <Head>
                <title>
                    Create Question
                </title>
            </Head>
            <div className='px-[5%]'>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <form onSubmit={formik.handleSubmit}
                        autoComplete="off"
                        noValidate
                        {...props}
                    >
                        <Box>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Criar uma nova questão
                            </Typography>

                            <TextField
                                error={Boolean(formik.touched.topico && formik.errors.topico)}
                                helperText={formik.touched.topico && formik.errors.topico}
                                fullWidth
                                label="Selecione o Tópico"
                                name="topico"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                select
                                SelectProps={{ native: true }}
                                value={formik.values.topico}
                                variant="outlined"
                            >
                                {topicos.map((option) => (
                                    <option
                                        key={option.label}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                error={Boolean(formik.touched.titulo && formik.errors.titulo)}
                                helperText={formik.touched.titulo && formik.errors.titulo}
                                fullWidth
                                label="Título da Questão"
                                name="titulo"
                                margin="normal"
                                onChange={formik.handleChange}
                                required
                                value={formik.values.titulo}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.descricao && formik.errors.descricao)}
                                helperText={formik.touched.descricao && formik.errors.descricao}
                                fullWidth
                                label="Descrição da Questão"
                                name="descricao"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                value={formik.values.descricao}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.descricaoDetalhada && formik.errors.descricaoDetalhada)}
                                helperText={formik.touched.descricaoDetalhada && formik.errors.descricaoDetalhada}
                                fullWidth
                                label="Descricão detalhada da Questão"
                                name="descricaoDetalhada"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                value={formik.values.descricaoDetalhada}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.dificuldade && formik.errors.dificuldade)}
                                helperText={formik.touched.dificuldade && formik.errors.dificuldade}
                                fullWidth
                                label="Selecione a dificuldade"
                                name="dificuldade"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                select
                                SelectProps={{ native: true }}
                                value={formik.values.dificuldade}
                                variant="outlined"
                            >
                                {dificuldades.map((option) => (
                                    <option
                                        key={option.label}
                                        value={option.label}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Box>
                        <Button
                            fullWidth
                            margin="normal"
                            type='submit'
                            color="primary"
                            variant="contained"
                        >
                            Cadastrar Questão
                        </Button>
                    </form>
                </Box>
            </div>
        </>
    );
};

CreateQuestion.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default CreateQuestion;