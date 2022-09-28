import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardHeader, Typography, useTheme } from '@mui/material';

export const TasksTopic = (props) => {

  const data = {
    datasets: [
      {
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00', '#6ddd17', '#881ce0', '#e01cb2', '#83a1a0', '#fff30c'],
        borderWidth: 4,
        borderColor: '#1F2937',
        hoverBorderColor: '#111827',    
      }
    ],
    labels: ['String', 'Função', 'Estrutura de Repetição', 'Classes', 'Operadores', 'Variáveis e Tipos de Dados', 'Arrays', 'Estrutura Condicional'],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <Card {...props} 
      sx={{ height: '100%', backgroundColor: '#1F2937'}} >
      <CardHeader title="Assunto das Tarefas Realizadas" />
 
        <Box
          sx={{
            height: 300,
            width: '100%',
            position: 'relative',
            pb:1
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
    </Card>
  );
};