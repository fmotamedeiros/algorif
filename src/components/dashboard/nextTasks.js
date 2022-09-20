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
  }
]

export const NextTasks = (props) => (
  <Card {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item
        >
          <Typography
            color="textPrimary"
            variant="h6"
          >
            PRÓXIMAS TAREFAS
          </Typography>
 
          {tasks.map((task) => (
          <Typography sx={{py:2.5}} key={task.id} >
              {task.tarefas}
          </Typography>
            ))}


          <Typography
            color="textPrimary"
            variant="overline"
          >
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
    </CardContent>
  </Card>
);