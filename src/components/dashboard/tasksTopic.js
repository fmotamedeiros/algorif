import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardHeader } from '@mui/material';

export const TasksTopic = (props) => {

  const data = {
    datasets: [
      {
        data: [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5],
        backgroundColor: ['rgba(63, 81, 181, 0.8)', 'rgba(229, 57, 53, 0.8)', 'rgba(251, 140, 0, 0.8)', 'rgba(109, 221, 23, 0.8)', 'rgba(136, 28, 224, 0.8)', 'rgba(224, 28, 178, 0.8)', 'rgba(131, 161, 160, 0.8)', 'rgba(255, 243, 12, 0.8)'],
        borderWidth: 4,
        borderColor: '#1F2937',
        hoverBorderColor: '#111827',    
      }
    ],
    labels: ['String', 'Função', 'Estrutura de Repetição', 'Classes', 'Operadores', 'Variáveis e Tipos de Dados', 'Arrays', 'Estrutura Condicional'],
  };

  const options = {
    animation: true,
    cutoutPercentage: 40,
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