import { Card, CardContent, Grid, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import Link from 'next/link';

const tasks = [
  {
    id: uuid(),
    tarefas: 'String'
  },
  {
    id: uuid(),
    tarefas: 'Função'
  },
  {
    id: uuid(),
    tarefas: 'Estrutura de Repetição'
  },
  {
    id: uuid(),
    tarefas: 'Classes'
  },
  {
    id: uuid(),
    tarefas: 'Operadores'
  },
  {
    id: uuid(),
    tarefas: 'Variáveis e Tipos de Dados'
  },
  {
    id: uuid(),
    tarefas: 'Arrays'
  },
  {
    id: uuid(),
    tarefas: 'Estrutura Condicional'
  },
]

export const NextTasks = (props) => (
  <Card {...props}
  >
    <CardContent>
        <Grid 
        container
        width="100%"
        sx={{ justifyContent: 'space-between' }}
        >
          <Typography
            sx={{pb:3}}
            color="textPrimary"
            variant="h6"
          >
            Selecione um Tópico
          </Typography>
        </Grid>

      <Grid className='sm:grid-cols-2 grid-cols-1'
        sx={{ display: 'grid', justifyContent: 'space-between', gap: 1 }}
        width="100%"
      >
        {tasks.map((task) => (
        <button>
          <Link href={`/tasks`}>
            <Typography className='border p-3 border-gray-500 hover:border-green-500' key={task.id} >
              {task.tarefas}
            </Typography>
          </Link>
        </button>

        
          ))}
      </Grid>
      
    </CardContent>
  </Card>
);