import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";
import Description from "../../components/question/description";
import descriptionData from "../../data/descriptions.json"

const CodeEditor = dynamic(import('../../components/editor/codeEditor'), {ssr: false})

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
        <div className="flex flex-wrap sm:flex-row-reverse h-screen">
            <div
                className="w-full md:w-1/2 xl:w-3/5 bg-cover flex"
            >
                <Box className="w-full h-full">
                    <CodeEditor />
                </Box>
            </div>     
            <Description descricao={descriptionData[router.query.question.toLowerCase()]['tarefa']} />           
        </div>

      </Box>
    </>
  )};

  Question.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Question;