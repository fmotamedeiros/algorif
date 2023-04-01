import { Box, Card, CardHeader } from '@mui/material';
import { useState } from 'react';
import { GetTasksWeekend } from '../../requestsFirebase/allGetRequests';
import { Bar } from 'react-chartjs-2';
import { Loader } from '../../requestsFirebase/loader';

export const TasksWeekend = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState()

  GetTasksWeekend(setAnsweredQuestions)

  if (!answeredQuestions) {
    return <Box className='h-full flex items-center justify-center bg-[#1F2937] rounded-lg'><Loader /></Box>;
  }

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
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

  return (
    <Card>
      <CardHeader
        title="Exercícios Concluídos"
      />
      <Box className='h-[350px]'>
        <Bar
          data={answeredQuestions}
          options={options}
        />
      </Box>
    </Card>
  );
};
