import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { DashboardLayout } from "../components/dashboard-layout";

const questions = [
  {
    nome: 'Some dois numeros',
    descricao: 'Crie duas variaveis e atribua um número a cada uma delas, fazendo então a soma delas, e usa o comando console.log() para apresentar na tela '
  },
  {
    nome: 'Divida dois numeros',
    descricao: 'Crie duas variaveis e atribua um número a cada uma delas, fazendo então a divisão delas, e usa o comando console.log() para apresentar na tela '
  },
];

const Tasks = () => (
    <>
      <Head>
        <title>
          Tasks | Material Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Box className="bg-[#1F2937] w-full p-4">
          <Container className="text-[30px] lg:text-[2rem] font-semibold text-white">
            String
          </Container>
        </Box>

        <Link href={`/question`}>
        <Container className="pt-10">
          {questions.map((question) => (
          <Box className="group">
            <button className="p-4 border mb-3 border-gray-500 group-hover:border-green-500 w-full">
              <Box className="font-semibold justify-between flex">
                <Box className="group-hover:text-green-500 p-2">
                {question.nome}
                </Box>
                <Box className="mb-4 p-2 border border-green-500 group-hover:bg-green-500 text-green-500 group-hover:text-[#1F2937] rounded">
                  Resolver Desafio
                </Box>

              </Box>
              <Box className="text-left text-gray-400 p-2">
                {question.descricao}
              </Box>
              <Box>

              </Box>
            </button>
            </Box>
          ))}

        </Container>
        </Link>
      </Box>
    </>
  );

  Tasks.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Tasks;