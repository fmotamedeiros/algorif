import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { SetContext } from '../../contexts/setFirebase';
import { useContext, useEffect, useRef } from 'react';
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
  const codeEditorRef = useRef(null);

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
              .required('difficulty é obrigatório'),
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
                            color="primary.light"
                            variant="h4"
                          >
                            Criar nova questão
                          </Typography>
                          <Box className='grid grid-cols-2 gap-x-4'>
                              <CustomTextField
                                  formik={formik}
                                  label="Selecione um tópico"
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
                              multiline
                              required
                          />

                          <Typography
                            color="primary.light"
                            variant="h5"
                          >
                            Dados da função
                          </Typography>

                          <CustomTextField
                              formik={formik}
                              label="Parâmetros da função"
                          />

                          {formik.values.tests && formik.values.tests.map((test, index) => (
                              <Box className='grid grid-cols-2 gap-x-4' key={`${test}-${index}`}>
                                  <CustomTextField
                                      formik={formik}
                                      label={`${index + 1}° entrada dos dados`}
                                      name={`tests.${index}.inputTest`}
                                      value={test.inputTest}
                                  />

                                  <CustomTextField
                                      formik={formik}
                                      label={`${index + 1}° saída dos dados`}
                                      name={`tests.${index}.outputTest`}
                                      value={test.outputTest}
                                  />
                              </Box>
                          ))}
                          <div className='flex justify-center mt-4 mb-6'>
                              <Button
                                sx={{ width: "50%" }}
                                variant='outlined'
                                type='button'
                                onClick={addTest}
                              >
                                Adicionar caso de teste
                              </Button>
                          </div>
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
