import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import Description from "../../components/solveTask/description";
import { GetContext } from "../../contexts/getFirebaseContext";

const CodeEditor = dynamic(import('../../components/solveTask/codeEditor'), {ssr: false})

const Question = () => {
  const router = useRouter()
  const loaded = false
  const [descriptionData, setDescriptionData] = useState(null)

  const getContext = useContext(GetContext);

  function descriptionQuestion() {
    getContext.getDescription(router.query.question).then((value) =>
    setDescriptionData(value)
    ).catch(console.error)
  }

  useEffect(() => {
    if(loaded){
      return
    }
    descriptionQuestion();
    loaded = true
  }, []);

  if(descriptionData){
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
               <Description descriptionData={descriptionData} />
              </div>     
              <Box className="lg:w-[60%] w-full">
                <CodeEditor />
              </Box>                  
          </Box>
  
        </Box>
      </>
    )} return <>Carregando</>
}
  

  Question.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Question;