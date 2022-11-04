import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";
import Description from "../../components/solveTask/description";
import descriptionData from "../../data/descriptions.json"

const CodeEditor = dynamic(import('../../components/solveTask/codeEditor'), {ssr: false})

const Question = () => {
  const router = useRouter()
  return(
    <>
      <Head>
        <title>
          {router.query.question}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
         <Box className="w-full flex flex-col lg:flex-row h-full">
            <div className="lg:w-[40%] lg:overflow-y-auto lg:h-[90vh]">
              <Description //Pega os dados de descriptons.json e cria uma aba lateral de descrição diferente para cada questão
              descricao={descriptionData[router.query.question.toLowerCase()]['tarefa']} 
              exemplo={descriptionData[router.query.question.toLowerCase()]['exemplo']}
              exemplo1 = {descriptionData[router.query.question.toLowerCase()]['exemplo1']} 
              entrada = {descriptionData[router.query.question.toLowerCase()]['entrada']}
              saida = {descriptionData[router.query.question.toLowerCase()]['saida']}
              amostra0 = {descriptionData[router.query.question.toLowerCase()]['amostra0']}
              amostra1 = {descriptionData[router.query.question.toLowerCase()]['amostra1']}
            />                  
            </div>     
            <Box className="lg:w-[60%] w-full">
              <CodeEditor />
            </Box>                  
        </Box>

      </Box>
    </>
  )};

  Question.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Question;