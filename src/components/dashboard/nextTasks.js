import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import topics from '../../data/topics.json'

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
        {topics.map((topic) => (
        <button key={topic.name}>
          <Link href={`/tasks/${topic.name}`}>
            <Typography className='border p-3 border-gray-500 hover:border-green-500'  >
              {topic.name}
            </Typography>
          </Link>
        </button>

        
          ))}
      </Grid>
      
    </CardContent>
  </Card>
);