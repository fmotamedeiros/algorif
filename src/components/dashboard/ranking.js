import { v4 as uuid } from 'uuid';

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

const orders = [
  {
    id: uuid(),
    position: '1°',
    customer: {
      name: 'Másio César'
    },
    tasks:'43',
  },
  {
    id: uuid(),
    position: '2°',
    customer: {
      name: 'Thalis Melo'
    },
    tasks:'35',
  },
  {
    id: uuid(),
    position: '3°',
    customer: {
      name: 'John Wallex'
    },
    tasks:'33',
  },
  {
    id: uuid(),
    position: '4°',
    customer: {
      name: 'Nathan Rafael'
    },
    tasks:'32',
  },
  {
    id: uuid(),
    position: '5°',
    customer: {
      name: 'Karine Millena'
    },
    tasks:'30',
  },
  {
    id: uuid(),
    position: '6°',
    customer: {
      name: 'Mauro Luis'
    },
    tasks:'25',
  },
  {
    id: uuid(),
    position: '7°',
    customer: {
      name: 'Lucas Cassiano'
    },
    tasks:'20',
  },
  {
    id: uuid(),
    position: '8°',
    customer: {
      name: 'Yasmin Santos'
    },
    tasks:'19',
  },
  {
    id: uuid(),
    position: '9°',
    customer: {
      name: 'Daniel Lage'
    },
    tasks:'18',
  },
  {
    id: uuid(),
    position: '10°',
    customer: {
      name: 'Madson Victor'
    },
    tasks:'15',
  }
];

export const Ranking = (props) => (
  <Card {...props}>
    <CardHeader title="Ranking" />
      <Box>
        <Table size='small' aria-label="a dense table">
          <TableHead sx={{ backgroundColor: 'background.dark'}}>
            <TableRow>
            <TableCell style={{color:'#9b9ea3'}}>
                Position
              </TableCell>
              <TableCell style={{color:'#9b9ea3'}}>
                Name
              </TableCell>
              <TableCell style={{color:'#9b9ea3'}}>
                Tasks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order.id}
              >
                <TableCell>
                  {order.position}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell style={{color:'#9b9ea3'}}>
                  {order.tasks}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
  </Card>
);