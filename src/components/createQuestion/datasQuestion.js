import {
    Box,
    Button,
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
import CustomTextField from '../customTextField';

const navDifficulties = getNavDifficulties()

const navTopics = getNavTopics()


const DatasQuestion = () => {
    const [onConsole, setConsole] = useState([])

    const [isCode, setCode] = useState(`function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())`)
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
            `function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())`)

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
            topic: '',
            title: '',
            description: '',
            detailedDescription: '',
            difficulty: '',
            tests: [
                { inputTest: '', outputTest: '' },
            ],
        },
        validationSchema: Yup.object({
            topic: Yup
                .string()
                .max(255)
                .required(
                    'Tópico da questão is required'),
            title: Yup
                .string()
                .max(255)
                .required(
                    'Título is required'),
            description: Yup
                .string()
                .required('Descricão is required'),
            detailedDescription: Yup
                .string()
                .required('Descricão detalhada is required'),
            difficulty: Yup
                .string()
                .max(255)
                .required('difficulty is required'),
            tests: Yup.array().of(
                Yup.object({
                    inputTest: Yup
                        .string()
                        .max(255)
                        .required('Teste de entrada é obrigatório'),
                    outputTest: Yup
                        .string()
                        .required('Teste de saída é obrigatório'),
                })
            ),
        }),
        onSubmit: async () => {
            await setContext.setCreateQuestion(formik.values, isCode)
            alert('Questão Cadastrada com Sucesso')
            Router.reload()
        }
    })

    const addTest = () => {
        formik.setValues({
            ...formik.values,
            tests: [...formik.values.tests, { inputTest: '', outputTest: '' }]
        });
    };

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
                                <CustomTextField
                                    formik={formik}
                                    label="Selecione o Tópico"
                                    name="topic"
                                    select
                                    options={navTopics}
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Título da Questão"
                                    name="title"
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Selecione a dificuldade"
                                    name="difficulty"
                                    select
                                    options={navDifficulties}
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Descrição da Questão"
                                    name="description"
                                />
                            </Box>
                            <CustomTextField
                                formik={formik}
                                label="Descricão detalhada da Questão"
                                name="detailedDescription"
                                multiline
                                rows={10}
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
                                            {onConsole.map((item, indice) => (<div key={`${item}-${indice}`}>{item}</div>))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {formik.values.tests && formik.values.tests.map((test, index) => (
                                <Box className='grid grid-cols-2 gap-x-4' key={`${test}-${index}`}>
                                    <CustomTextField
                                        formik={formik}
                                        label={`Dados de entrada ${index + 1}`}
                                        name={`tests.${index}.inputTest`}
                                        value={test.inputTest}
                                    />

                                    <CustomTextField
                                        formik={formik}
                                        label={`Saída dos dados de entrada ${index + 1}`}
                                        name={`tests.${index}.outputTest`}
                                        value={test.outputTest}
                                    />
                                </Box>
                            ))}
                            <div className='flex justify-center mt-4 mb-6'>
                                <Button sx={{ width: "50%" }} variant='outlined' type='button' onClick={addTest}>Adicionar mais testes</Button>
                            </div>
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