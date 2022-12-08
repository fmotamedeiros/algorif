import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth-context';
import { useRouter } from 'next/router';


export const AccountProfile = (props) => {
  const router = useRouter()
  const authContext = useContext(AuthContext);
  const [imgURL, setImgURL] = useState("")

  const handleUpload = async (event) => {
    event.preventDefault()

    const file = event.target[0]?.files[0]

    if (!file) return;

    await authContext.setPictureUser(file)
    
    router.reload()
  }

  authContext.getPictureUser(setImgURL, imgURL)   

  return (
    //<form onSubmit={formik.handleSubmit}>
    <Card {...props}
      sx={{ backgroundColor: 'background.dark' }}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={imgURL}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {props.coders.userName}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {`${props.coders.city} - ${props.coders.state}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <form onSubmit={handleUpload}>
      <CardActions >     
          <Button
            fullWidth
            color="primary"
            variant="text"
            component="label"
          >
            Carregar foto
            <input
              hidden
              type="file"
            />
          </Button>
          <Button
          fullWidth
            color="primary"
            variant="text"
            type='submit'>
            Enviar
          </Button>
      </CardActions>
      </form>

    </Card>
    //</form>
  )
};
