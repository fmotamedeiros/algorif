import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import { v4 as uuid } from 'uuid';

const tasks = [
  {
    id: uuid(),
    tarefas: 'Soma de Inteiros'
  },
  {
    id: uuid(),
    tarefas: 'Converter Fahrenheit para Celsius'
  },
  {
    id: uuid(),
    tarefas: 'Resto da Divisão'
  },
  {
    id: uuid(),
    tarefas: 'Multiplicar'
  },
  {
    id: uuid(),
    tarefas: 'Tamanho da String'
  }
]

export const NextTasks = (props) => (
  <Card {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        width="100%"
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item
        >
          <Typography
            sx={{pb:3}}
            color="textPrimary"
            variant="h6"
          >
            PRÓXIMAS TAREFAS
          </Typography>
        </Grid>
        <Grid>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <AddToQueueIcon />
          </Avatar>
        </Grid>
      </Grid>
      {tasks.map((task) => (
        <Typography sx={{border:1, borderRadius:1, p:1, my:2}} key={task.id} >
            {task.tarefas}
        </Typography>
          ))}
    </CardContent>
  </Card>
);