import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { useContext, useEffect, useState, useRef } from 'react';
import { getNavDifficulties } from '../datas/navdifficulties';
import { SetContext } from '../../contexts/setFirebase';
import { getNavTopics } from '../datas/navTopics';
import CustomTextField from '../customTextField';
import { useFormik } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';

import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/mode/python/python'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import CodeMirror from 'codemirror';

const navDifficulties = getNavDifficulties()
const navTopics = getNavTopics()

const codePython = "def main():\n    # Seu código Python aqui\n    return\n\nprint(main())"
const codeJs = "function main(/*variáveisDeEntradas*/) {\n    return\n} \n\nconsole.log(main())"


const DatasQuestion = () => {
    const codeEditorRef = useRef(null)
    const [isPython, setPython] = useState(false)

    useEffect(() => {
        const modeLanguage = isPython ? 'python' : 'javascript';

        if (!codeEditorRef.current) {

          const codeEditor = CodeMirror.fromTextArea(
            document.getElementById('code-editor'),
            {
              mode: modeLanguage,
              theme: 'dracula',
              lineNumbers: true,
              autoCloseTags: true,
              autoCloseBrackets: true,
            }
          );

          codeEditor.setSize('100%', 520);
          codeEditorRef.current = codeEditor;

        } else {
            const codeEditor = codeEditorRef.current;
            const code = isPython ? codePython : codeJs;

            codeEditor.setOption('mode', modeLanguage);
            codeEditor.setValue(code);
          }

      }, [isPython]);

    const outputResult = () => {
        try {
            if (isPython) {

            } else {
                eval(codeEditorRef.current.getValue()); // executar o código
            }
            output.innerHTML = consoleWritten.map(line => line + "<br>").join("\n");
            consoleWritten = []
        } catch (error) {
            output.textContent = error.toString();
        }
    };

    // redefinir console.log para adicionar saída ao elemento de saída
    let consoleWritten = [];
    const handleRun = () => {
        console.log = (...args) => {
            consoleWritten.push(...args);
        };
        outputResult();
    };

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
                .required('Tópico da questão é obrigatório'),
            title: Yup
                .string()
                .max(255)
                .required('Título é obrigatório'),
            description: Yup
                .string(),
            detailedDescription: Yup
                .string()
                .required('Descrição detalhada é obrigatório'),
            difficulty: Yup
                .string()
                .max(255)
                .required('Dificuldade é obrigatório'),
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
            await setContext.setCreateQuestion(formik.values, codeEditorRef.current.getValue())
            alert('Questão cadastrada com sucesso')
            Router.reload()
        }
    })

    const addTest = () => {
        formik.setValues({
            ...formik.values,
            tests: [...formik.values.tests, { inputTest: '', outputTest: '' }]
        });
    };

    const removeTest = () => {
        if (!(formik.values.tests.length == 1)) {
            const updatedTests = [...formik.values.tests];

            updatedTests.pop();
            formik.setValues({
                ...formik.values,
                tests: updatedTests,
            });
        }
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
                                color="primary.light"
                                variant="h4"
                            >
                                Criar nova questão
                            </Typography>

                            <Box className='grid grid-cols-2 gap-x-4'>
                                <CustomTextField
                                    formik={formik}
                                    label="Selecione o tópico"
                                    name="topic"
                                    options={navTopics}
                                    required
                                    select
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Título da questão"
                                    name="title"
                                    required
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Selecione a dificuldade"
                                    name="difficulty"
                                    options={navDifficulties}
                                    required
                                    select
                                />
                                <CustomTextField
                                    formik={formik}
                                    label="Descrição da questão"
                                    name="description"
                                />
                            </Box>

                            <CustomTextField
                                formik={formik}
                                label="Descrição detalhada da questão"
                                name="detailedDescription"
                                rows={10}
                                required
                                multiline
                            />

                            <Typography
                                className='mt-4'
                                color="primary.light"
                                variant="h5"
                            >
                                Dados da função
                            </Typography>

                            <div className='flex mt-2'>

                                <textarea id='code-editor'></textarea>

                                <div className='w-[40%]'>
                                    <div className='px-1 py-1 flex justify-end bg-[#1F2937] border border-gray-700'>
                                        <ButtonGroup
                                            className='mr-2'>
                                            <Button
                                                onClick={() => setPython(false)}
                                                variant={!isPython ? 'contained' : 'outlined'}
                                            >
                                                Javascript
                                            </Button>
                                            <Button
                                                onClick={() => setPython(true)}
                                                variant={isPython ? 'contained' : 'outlined'}
                                            >
                                                Python
                                            </Button>
                                        </ButtonGroup>

                                        <Button
                                            variant='outlined'
                                            type='button'
                                            onClick={handleRun}
                                        >
                                            Executar
                                        </Button>
                                    </div>
                                    <div id="output"
                                        className='bg-[#1F2937] border border-gray-700 h-[467.5px] overflow-y-auto p-6'
                                    />
                                </div>
                            </div>

                            {formik.values.tests && formik.values.tests.map((test, index) => (
                                <Box
                                    className='grid grid-cols-2 gap-x-4'
                                    key={`${test}-${index}`}
                                >
                                    <CustomTextField
                                        formik={formik}
                                        label={`${index + 1}° entrada dos dados`}
                                        name={`tests.${index}.inputTest`}
                                        value={test.inputTest}
                                        required
                                    />

                                    <CustomTextField
                                        formik={formik}
                                        label={`${index + 1}° saída dos dados`}
                                        name={`tests.${index}.outputTest`}
                                        value={test.outputTest}
                                        required
                                    />
                                </Box>
                            ))}

                            <Box className='flex flex-row gap-4 mt-4 mb-6'>
                                <Button
                                    sx={{ width: "50%" }}
                                    onClick={addTest}
                                    variant='outlined'
                                    type='button'
                                >
                                    Adicionar caso de teste
                                </Button>

                                <Button
                                    sx={{ width: "50%" }}
                                    onClick={removeTest}
                                    variant='outlined'
                                    type='button'
                                >
                                    Remover caso de teste
                                </Button>
                            </Box>
                        </Box>

                        <Button
                          fullWidth
                          margin="normal"
                          type='submit'
                          color="primary"
                          variant="contained"
                        >
                          Cadastrar questão
                        </Button>
                    </form>
                </Box>
            </div>
        </>
    );
};

export default DatasQuestion
