import { Box, Popover } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import questions from "../../data/questions.json";
import { Exercices } from "../../components/quests/exercices"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Filter } from "../../components/quests/filter";

const Tasks = () => {
  const router = useRouter()
  const [isTopicsOpen, setTopicsOpen] = useState(null)
  const [isFilterOpen, setFilterOpen] = useState(null)

  const handleClick = (event) => {
    setTopicsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setTopicsOpen(null);
  };

  const clickFilter = (event) => {
    setFilterOpen(event.currentTarget);
  };

  const filterClose = () => {
    setFilterOpen(null);
  };


  const open = Boolean(isTopicsOpen);
  const unClose = Boolean(isFilterOpen);
  const topics = open ? 'simple-popover' : undefined;
  const filter = unClose ? 'simple-popover' : undefined;


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
        <Box className="bg-[#1F2937] w-full p-4 px-6">
          <div className="text-[30px] lg:text-[2rem] font-semibold text-white max-w-[1150px] mx-auto flex justify-between">
            <button aria-describedby={topics} 
            onClick={handleClick} 
            className="hover:text-green-500">
              {router.query.name}
              <ExpandMoreIcon fontSize="20" />
            </button>           
            <Popover
              id={topics}
              open={open}
              anchorEl={isTopicsOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Exercices />
            </Popover>

            <button
            className="text-[15px] lg:hidden text-[#21a87b] border border-[#3FC79A] px-2 rounded hover:bg-[#21a87b] hover:text-[#1F2937]" 
            aria-describedby={filter} 
            onClick={clickFilter} >
              Filtro
            </button>
            <Popover
              id={filter}
              open={unClose}
              anchorEl={isFilterOpen}
              onClose={filterClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div className="mt-1 mb-1">
                <Filter />
              </div>
              
            </Popover>
            
          </div>
        </Box>

        <div className="px-6">
        <Box className="w-full max-w-[1150px] flex flex-col lg:flex-row pt-5 justify-between mx-auto gap-4 h-full">
          <div className="lg:max-w-[80%]">
          {questions[router.query.name.toLowerCase()]["questions"].map((question) => (
          <Link href={`/questions/${question.href}`} 
            key={question.task}>
            <div className="pb-3">
              <Box className="group">
                <button className="p-4 border mb-3 border-gray-500 group-hover:border-green-500 w-full rounded">
                  <Box className="font-semibold justify-between flex">
                    <Box className="p-2">
                      <div className="group-hover:text-green-500 flex">
                        {question.task}
                      </div>
                      <div className="text-[13px] flex">
                        <div className="text-green-500">
                        {question.dificuldade}
                        </div>
                        <div>
                        , Taxa de Sucesso: {question.taxaSucesso}
                        </div>
                      </div>
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
            </div>
          </Link>
          ))}
          </div>
          <Box className="h-full lg:flex flex-col hidden">
            <Filter />
            
          </Box>

      </Box>
      </div>
        
      </Box>
    </>
  )};

  Tasks.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default Tasks;