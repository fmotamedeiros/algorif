import Head from 'next/head';
import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { SetContext } from '../contexts/setFirebaseContext';
import { useContext, useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'

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
    const loaded = false
    const [codigo, setCodigo] = useState("")

    useEffect(() => {
        if (loaded) {
            return
        }
        async function init() {
            require('codemirror/mode/javascript/javascript')
            require('codemirror/addon/edit/closetag')
            require('codemirror/addon/edit/closebrackets')
            const CodeMirror = require('codemirror')
            const instance = CodeMirror.fromTextArea(document.getElementById("code"), {
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,

            })
            instance.setValue(
                `function /* nome da função */ (/* variáveis de entradas */) {
    return
}

console.log()`)

            instance.setOption("autoCloseBrackets", true);
            instance.setOption('autoCloseTags', true)

            instance.on('change', (instance, changes) => {
                const code = instance.getValue();
                console.log(code)
                try {
                    setCodigo(code)
                } catch (error) {
                    console.log(error)
                }
            });
        }
        loaded = true
        init();
    }, []);

    const formik = useFormik({
        initialValues: {
            topico: '',
            titulo: '',
            descricao: '',
            descricaoDetalhada: '',
            dificuldade: '',
            nameFunction: '',
            inputTest: '',
            outputTest: ''
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
                .required('Descricão is required'),
            descricaoDetalhada: Yup
                .string()
                .required('Descricão detalhada is required'),
            dificuldade: Yup
                .string()
                .max(255)
                .required('Dificuldade is required'),
            nameFunction: Yup
                .string()
                .max(255)
                .required('Nome da função is required'),
            inputTest: Yup
                .string()
                .max(255)
                .required('Teste de entrada is required'),
            outputTest: Yup
                .number()
                .required('Teste de saída is required'),
        }),
        onSubmit: async () => {
            await setContext.setCreateQuestion(formik.values, codigo)
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
                                multiline
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
                                multiline
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
                            <TextField
                                error={Boolean(formik.touched.nameFunction && formik.errors.nameFunction)}
                                helperText={formik.touched.nameFunction && formik.errors.nameFunction}
                                fullWidth
                                label="Nome da função usada no código"
                                placeholder='Ex: multiply'
                                name="nameFunction"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                value={formik.values.nameFunction}
                                variant="outlined"
                            />
                            <div className='my-2'>
                                <textarea id='code'></textarea>
                            </div>
                            <TextField
                                error={Boolean(formik.touched.inputTest && formik.errors.inputTest)}
                                helperText={formik.touched.inputTest && formik.errors.inputTest}
                                fullWidth
                                label="Dados de entrada"
                                placeholder='Ex: 2, 4'
                                name="inputTest"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                value={formik.values.inputTest}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(formik.touched.outputTest && formik.errors.outputTest)}
                                helperText={formik.touched.outputTest && formik.errors.outputTest}
                                fullWidth
                                label="Saída dos dados de entrada"
                                placeholder='Ex: 8'
                                name="outputTest"
                                onChange={formik.handleChange}
                                required
                                margin="normal"
                                value={formik.values.outputTest}
                                variant="outlined"
                            />
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