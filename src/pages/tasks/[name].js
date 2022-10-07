import { Box, Checkbox, FormControlLabel, Popover, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import questions from "../../data/questions.json";
import { Exercices } from "../../components/quests/exercices"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tasks = () => {
  const router = useRouter()
  const [isTopicsOpen, setTopicsOpen] = useState(null)

  const handleClick = (event) => {
    setTopicsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setTopicsOpen(null);
  };

  const open = Boolean(isTopicsOpen);
  const id = open ? 'simple-popover' : undefined;


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
          <div className="text-[30px] lg:text-[2rem] font-semibold text-white max-w-[1150px] mx-auto">
            <button aria-describedby={id} 
            onClick={handleClick} 
            className="hover:text-green-500">
              {router.query.name}
              <ExpandMoreIcon fontSize="20" />
            </button>
            
            <Popover
              id={id}
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
            </div>
          </Link>
          ))}
          </div>
          <Box className="p-2 h-full border border-gray-500 rounded flex flex-col">
            <div className="flex flex-col border-b border-gray-500 w-full px-4">
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                Condição
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Resolvido"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Não Resolvido"
              />           
          </div>
          <div className="flex flex-col pt-2 px-4">
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Dificuldade
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="Iniciante"
            />  
            <FormControlLabel
              control={<Checkbox />}
              label="Fácil"
            />  
            <FormControlLabel
              control={<Checkbox />}
              label="Médio"
            />   
            <FormControlLabel
              control={<Checkbox />}
              label="Difícil"
            />  
            <FormControlLabel
              control={<Checkbox />}
              label="Expert"
            />  
          </div>
            
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