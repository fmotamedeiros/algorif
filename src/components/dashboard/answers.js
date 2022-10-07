import { Box, Card, CardHeader } from '@mui/material';
import { Bar } from 'react-chartjs-2';

export const Answers = (props) => {
    const dataBar = {
      datasets: [
      {
        backgroundColor: ['rgba(63, 81, 181, 0.7)', 'rgba(109, 221, 23, 0.7)', 'rgba(255, 243, 12, 0.7)', 'rgba(251, 140, 0, 0.7)','rgba(229, 57, 53, 0.7)'],
        borderColor: ['rgba(63, 81, 181, 0.8)', 'rgba(109, 221, 23, 0.8)', 'rgba(255, 243, 12, 0.8)', 'rgba(251, 140, 0, 0.8)','rgba(229, 57, 53, 0.8)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(63, 81, 181, 0.5)', 'rgba(109, 221, 23, 0.5)', 'rgba(255, 243, 12, 0.5)', 'rgba(251, 140, 0, 0.5)','rgba(229, 57, 53, 0.5)'],
        hoverBorderColor: ['rgba(63, 81, 181, 0.7)', 'rgba(109, 221, 23, 0.7)', 'rgba(255, 243, 12, 0.7)', 'rgba(251, 140, 0, 0.7)','rgba(229, 57, 53, 0.7)'],
        data: [65, 59, 91, 41, 20]
      },
    ],
    labels: ['Iniciante', 'Fácil', 'Médio', 'Difícil', 'Expert'],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return(
    <Card {...props}
    >
      <CardHeader title="Taxa de Acerto dos Exercícios" />
      
      <Box className='p-2 px-6'>
        <Bar data={dataBar} 
        options={options}
        width={360} />
        
      </Box>
    </Card>
  );
};