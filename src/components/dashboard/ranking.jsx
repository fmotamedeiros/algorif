import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { useState } from 'react';
import { AllRanking } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';

export const Ranking = () => {
  const [ranking, setRanking] = useState([])

  AllRanking(setRanking)

  if (!ranking) {
    return <Box className='h-full flex items-center justify-center bg-[#1F2937] rounded-lg'><Loader /></Box>;
  }

  return (
    <Card>
      <CardHeader
        title="Classificação"
      />
      <Box className='overflow-y-auto h-[350px]'>
        <Table size='small'
          aria-label="a dense table">
          <TableHead sx={{ backgroundColor: 'background.dark' }}>
            <TableRow>
              <TableCell style={{ color: '#9b9ea3' }}>
                Posição
              </TableCell>
              <TableCell style={{ color: '#9b9ea3' }}>
                Nome
              </TableCell>
              <TableCell style={{ color: '#9b9ea3' }}>
                Tarefas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.map((ranking, indice) => (
              <TableRow
                key={indice}
              >
                <TableCell>
                  {indice + 1}°
                </TableCell>
                <TableCell>
                  {ranking.userName}
                </TableCell>
                <TableCell style={{ color: '#9b9ea3' }}>
                  {ranking.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}