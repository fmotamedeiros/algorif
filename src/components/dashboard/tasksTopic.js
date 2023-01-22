import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardHeader } from '@mui/material';
import { useState } from 'react';
import { GetTasksTopic } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';

export const TasksTopic = (props) => {

  const [percentage, setPercentage] = useState()

  GetTasksTopic(setPercentage)

  if (!percentage) {
    return <Box className='h-full flex items-center justify-center bg-[#1F2937] rounded-lg'><Loader /></Box>;
  }

  const options = {
    animation: true,
    cutoutPercentage: 40,
    layout: { padding: 0 },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#bbbec7",
        }
      },
    },
    maintainAspectRatio: false,
    responsive: true,

  };

  return (
    <Card {...props}
      sx={{ height: '100%', backgroundColor: '#1F2937' }} >
      <CardHeader title="Assunto das Tarefas Realizadas" />

      <Box
        sx={{
          height: 300,
          width: '100%',
          position: 'relative',
          pb: 1
        }}
      >
        <Doughnut
          data={percentage}
          options={options}
        />
      </Box>
    </Card>
  );
};