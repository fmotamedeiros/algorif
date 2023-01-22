import { Box, Card, CardHeader } from '@mui/material';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { GetDifficultRate } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';

export const DifficultyRate = (props) => {
  const [percentage, setPercentage] = useState()

  GetDifficultRate(setPercentage)
  
  if (!percentage) {
    return <Box className='h-full flex items-center justify-center bg-[#1F2937] rounded-lg'><Loader /></Box>;
  }

  const options = {
    animation: false,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: { color: '#bbbec7', beginAtZero: true, callback: (value) => `${value}%` }
      },
      x: {
        ticks: { color: '#bbbec7', beginAtZero: true }
      }
    }
  };


  return (
    <Card {...props}
    >
      <CardHeader title="Taxa de Acerto dos Exercícios" />

      <Box className='p-2 px-6'
        sx={{ height: 300, position: 'relative' }}>
        <Bar data={percentage}
          options={options}
          width={360} />
      </Box>
    </Card>
  );
};