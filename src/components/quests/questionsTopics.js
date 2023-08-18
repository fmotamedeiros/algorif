import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { AllTopics } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';
import { Box } from '@mui/system';

export const QuestionsTopics = () => {
  const [topics, setTopics] = useState([])
  
  AllTopics(setTopics)

  return (
    <Card>
      <CardContent>
        <Grid
          container
          width="100%"
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography
            sx={{ pb: 3 }}
            color="textPrimary"
            variant="h6"
          >
            Selecione um Tópico
          </Typography>
        </Grid>

        {topics ?
          <Grid className='sm:grid-cols-2 grid-cols-1'
            sx={{ display: 'grid', justifyContent: 'space-between', gap: 1 }}
            width="100%"
          >
            {topics.map((topic, i) => (
              <button key={`${topic}-${i}`}> 
                <Link href={`/tasks/${topic}`}>
                  <Typography className='border p-3 border-gray-500 hover:border-green-500'  >
                    {topic}
                  </Typography>
                </Link>
              </button>
            ))}
          </Grid>
          : <Loader /> }
      </CardContent>
    </Card>
  )
}