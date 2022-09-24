import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";
import Description from "../components/question/description";

const CodeEditor = dynamic(import('../components/editor/codeEditor'), {ssr: false})

const Question = () => (
    <>
      <Head>
        <title>
          Question | Material Kit
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
            <Description />
        </div>

      </Box>
    </>
  );

  Question.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Question;