import { Box, Card, CardHeader } from '@mui/material';
import { Bar } from 'react-chartjs-2';

export const Answers = (props) => {
    const dataBar = {
      datasets: [
      {
        backgroundColor: ['rgba(0, 230, 0, 1)', 'rgba(0, 200, 0, 1)', 'rgba(0, 170, 0, 1)', 'rgba(0, 140, 0, 1)','rgba(0, 110, 0, 1)'],
        borderColor: ['rgba(0, 230, 0, 0.7)', 'rgba(0, 200, 0, 0.7)', 'rgba(0, 170, 0, 0.7)', 'rgba(0, 140, 0, 0.7)','rgba(0, 110, 0, 0.7)'],
        borderWidth: 1,
        barThickness:30,
        label: 'Taxa de Acerto',
        hoverBackgroundColor: ['rgba(0, 230, 0, 0.5)', 'rgba(0, 200, 0, 0.5)', 'rgba(0, 170, 0, 0.5)', 'rgba(0, 140, 0, 0.5)','rgba(0, 110, 0, 0.5)'],
        hoverBorderColor: ['rgba(0, 230, 0, 0.8)', 'rgba(0, 200, 0, 0.8)', 'rgba(0, 170, 0, 0.8)', 'rgba(0, 140, 0, 0.8)','rgba(0, 110, 0, 0.8)'],
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
    scales: {
      y: {
        ticks: { color: '#bbbec7', beginAtZero: true }
      },
      x: {
        ticks: { color: '#bbbec7', beginAtZero: true }
      }
    }
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