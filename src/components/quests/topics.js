import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { GetContext } from '../../contexts/getFirebaseContext';

export const Topics = () => {
  const [topics, setTopics] = useState([])
  const getContext = useContext(GetContext);
  const loaded = false
  function allTopics() {
    getContext.getTopics(setTopics)
  }
  
  useEffect(() => {
    if(loaded) {
      return
    }
    allTopics();
    loaded = true
  }, []);

    if (topics) {
    return(
      <Card>
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
            <button key={topic}>
              <Link href={`/tasks/${topic}`}>
                <Typography className='border p-3 border-gray-500 hover:border-green-500'  >
                  {topic}
                </Typography>
              </Link>
            </button>
    
            
              ))}
          </Grid>
          
        </CardContent>
      </Card>
      )
    } return <>Carregando</>
  
};