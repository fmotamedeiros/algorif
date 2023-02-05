import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader } from '@mui/material';

export const TasksWeekend = () => {

  const hasData = true
  const labels = []
  const data = {
    datasets: [
      {
        backgroundColor: '#22c55e',
        barPercentage: 0.5,
        barThickness: 10,
        borderRadius: 2,
        categoryPercentage: 0.5,
        data: [],
        label: 'Desafios Completados',
        maxBarThickness: 10
      },
    ],
    labels: labels
  };

  if (labels.length === 0) {
    hasData = false
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
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          {
            !hasData && <div className='flex justify-center items-center h-full text-gray-500 text-2xl'>Indisponível</div>
          }
          {/* <Bar
            data={data}
            options={options}
          /> */}
        </Box>
      </CardContent>
    </Card>
  );
};
