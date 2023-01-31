import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Description from "../../../components/solveTask/description";
import { DescriptionTask, GetTaskSolved } from "../../../requestsFirebase/allGetRequests";
import { Loader } from "../../../requestsFirebase/loader";

const CodeEditor = dynamic(import('../../../components/solveTask/codeEditor'), { ssr: false })

const Question = () => {
  const router = useRouter()
  const [descriptionData, setDescriptionData] = useState(null)
  const [taskSolved, setTaskSolved] = useState()

  DescriptionTask(router.query.question, setDescriptionData)
  GetTaskSolved(setTaskSolved)

  if (descriptionData && taskSolved) {
    return (
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
            <div className="lg:w-[40%]">
              <div className="lg:overflow-y-auto lg:h-[85vh]">
                <Description description={descriptionData.descricaoDetalhada} />
              </div>
            </div>
            <Box className="lg:w-[60%] w-full">
              <CodeEditor descriptionData={descriptionData} nameQuestion={router.query.question} taskSolved={taskSolved} />
            </Box>
          </Box>

        </Box>
      </>
    )
  } return <Loader />
}


Question.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Question;