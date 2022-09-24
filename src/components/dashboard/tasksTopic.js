import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';

export const TasksTopic = (props) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 23],
        backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
        borderWidth: 8,
        borderColor: '#1F2937',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['String', 'Função', 'Estrutura de Repetição', 'Classes', 'Operadores', 'Variáveis e Tipos de Dados', 'Arrays', 'Estrutura Condicional',] 
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Função',
      value: 63,
      color: '#3F51B5'
    },
    {
      title: 'Repetição',
      value: 15,
      color: '#E53935'
    },
    {
      title: 'Classes',
      value: 23,
      color: '#FB8C00'
    }
  ];

  return (
    <Card {...props} sx={{ height: '100%', backgroundColor: '#1F2937'}} >
      <CardHeader title="Assunto das Tarefas Realizadas" />
 
        <Box
          sx={{
            height: 200,
            width: '100%',
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                paddingX: 1,
                textAlign: 'center'
              }}
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h5"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
    </Card>
  );
};