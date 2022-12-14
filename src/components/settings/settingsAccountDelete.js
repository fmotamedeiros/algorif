import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@mui/material';
import { useContext } from 'react';
import { DeleteContext } from '../../contexts/deleteFirebaseContext';

export const SettingsAccountDelete = (props) => {
  
  const deleteContext = useContext(DeleteContext);

  const handleSubmit = () =>{
    deleteContext.deleteDataUser()
  }

  return(
  <form {...props}>
    <Card sx={{ backgroundColor: '#1F2937' }}>
      <CardHeader
        subheader="Excluir todos os dados da conta"
        title="Excluir a conta"
      />
      <Divider />
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
      >
        <Button
          onClick={handleSubmit}
          color="error"
          variant="contained"
        >
          Excluir a conta
        </Button>
      </Box>
    </Card>
  </form>
  )
};
