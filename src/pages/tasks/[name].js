import { Box, Container } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../components/dashboard-layout";
import questions from "../../data/questions.json"

const Tasks = () => {
  const router = useRouter()
  return(
    <>
      <Head>
        <title>
          {router.query.name}
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
            {router.query.name}
          </Container>
        </Box>
        
          {questions[router.query.name.toLowerCase()]["questions"].map((question) => (
          <Link href={`/questions/${question.href}`} 
            key={question.task}>
            <Container className="pt-5">
              <Box className="group">
                <button className="p-4 border mb-3 border-gray-500 group-hover:border-green-500 w-full">
                  <Box className="font-semibold justify-between flex">
                    <Box className="group-hover:text-green-500 p-2">
                    {question.task}
                    </Box>
                    <Box className="mb-4 p-2 border border-green-500 group-hover:bg-green-500 text-green-500 group-hover:text-[#1F2937] rounded">
                      Resolver Desafio
                    </Box>
                  </Box>
                  <Box className="text-left text-gray-400 p-2">
                    {question.descricao}
                  </Box>
                </button>
              </Box>
            </Container>
          </Link>
          ))}

        
      </Box>
    </>
  )};

  Tasks.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Tasks;