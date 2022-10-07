import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Popover, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

export const TasksWeekend = (props) => {
  const theme = useTheme();

  const [time, setTime] = useState("Semanal");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const data = {
    datasets: [
      {
        backgroundColor: '#22c55e',
        barPercentage: 0.5,
        barThickness: 7,
        borderRadius: 2,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: 'Desafios Completados',
        maxBarThickness: 7
      },
    ],
    labels: ['1° Semana', '2° Semana', '3° Semana', '4° Semana', '5° Semana', '6° Semana', '7° Semana']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: 'theme.palette.text.secondary'
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: 'theme.palette.text.secondary',
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: 'theme.palette.text.secondary',
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: 'theme.palette.text.secondary',
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <>
            <Button
              aria-describedby={id} 
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon fontSize="small" />}
              size="small"
            >
              {time}
            </Button>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Button onClick={() => setTime("Mensal")} 
            className='p-2 text-green-400'>Mensal</Button>
            <Button onClick={() => setTime("Semanal")} 
            className='p-2 text-green-400'>Semanal</Button>
          </Popover>
          </>
        )}
        title="Exercícios Concluídos"
      />
      <CardContent>
        <Box
          sx={{
            height: 270,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
