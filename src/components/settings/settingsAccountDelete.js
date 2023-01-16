import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { DeleteContext } from '../../contexts/deleteFirebase';

export const SettingsAccountDelete = (props) => {
  const router = useRouter()
  const deleteContext = useContext(DeleteContext);

  const handleSubmit = async () =>{
    const confirmBox = window.confirm(
      "Você realmente quer excluir sua conta?"
    )
    if (confirmBox === true) {
      await deleteContext.deleteDataUser()
      router.push("/login")
    }
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
