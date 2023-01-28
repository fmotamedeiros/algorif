import {
    Box,
    Button,
    TextField,
    Typography
} from '@mui/material';
import { SetContext } from '../../contexts/setFirebase';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/mode/javascript/javascript'
import CodeMirror from 'codemirror';
import { getNavTopics } from '../datas/navTopics';
import { getNavDifficulties } from '../datas/navdifficulties';

const navDifficulties = getNavDifficulties()

const navTopics = getNavTopics()


const DatasQuestion = () => {
    const [onConsole, setConsole] = useState([])

    const [isCode, setCode] = useState("")
    const loaded = false

    useEffect(() => {
        if (loaded) {
            return
        }
        const codeEditor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
            mode: "javascript",
            theme: 'dracula',
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true
        });
        codeEditor.setSize("100%", 520)

        const originalLog = console.log;

        // redefinir console.log para adicionar saída ao elemento de saída
        var consoleWritten = []
        console.log = (output) => {
            consoleWritten.push(output);
            setConsole(consoleWritten);
        };

        const runCode = () => {
            try {
                eval(codeEditor.getValue()); // executar o código
                consoleWritten = []
            } catch (e) {
                originalLog(e.message);
            }
        };

        codeEditor.setValue(
            `function main (/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())`)

        codeEditor.on('change', (instance, changes) => {
            const code = instance.getValue();
            originalLog(code)
            try {
                setCode(code)
            } catch (error) {
                originalLog(error)
            }
        });

        document.getElementById('run-button').addEventListener('click', runCode);

        loaded = true
    }, []);

    const formik = useFormik({
        initialValues: {
            topico: '',
            titulo: '',
            descricao: '',
            descricaoDetalhada: '',
            dificuldade: '',
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
            inputTest: Yup
                .string()
                .max(255)
                .required('Teste de entrada is required'),
            outputTest: Yup
                .string()
                .required('Teste de saída is required'),
        }),
        onSubmit: async () => {
            await setContext.setCreateQuestion(formik.values, isCode)
            alert('Questão Cadastrada com Sucesso')
            Router.reload()
        }
    })

    const setContext = useContext(SetContext);

    return (
        <>
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
                    >
                        <Box>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Criar uma nova questão
                            </Typography>
                            <Box className='grid grid-cols-2 gap-x-4'>
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
                                    {navTopics.map((option) => (
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
                                    {navDifficulties.map((option) => (
                                        <option
                                            key={option.label}
                                            value={option.label}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
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
                            </Box>
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
                            <div className='flex mt-2'>
                                <textarea id='code-editor'></textarea>
                                <div className='w-[40%]'>
                                    <div id="output"
                                        className='bg-[#1F2937] border border-gray-700 h-full'>
                                        <div className='px-1 py-1 flex justify-end'>
                                            <Button variant='outlined' type='button'
                                                id='run-button'>Executar
                                            </Button>
                                        </div>
                                        <div className='p-6'>
                                            {onConsole.map((item, indice) => (<div key={indice}>{item}</div>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Box className='grid grid-cols-2 gap-x-4'>
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
                            {/* <Button variant='outlined' type='button' onClick={addVariables}>Adicionar</Button> */}
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

export default DatasQuestion