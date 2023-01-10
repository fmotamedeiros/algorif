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
import { GetContext } from '../../contexts/getFirebaseContext';
import { SetContext } from '../../contexts/setFirebaseContext';


export const AccountProfile = (props) => {
  const setContext = useContext(SetContext);
  const getContext = useContext(GetContext);
  const [imgURL, setImgURL] = useState("")

  const handleUpload = async (event) => {
    const file = event.target[0]?.files[0]

    if (!file) return;

    await setContext.setPictureUser(file)
  }

  getContext.getPictureUser(setImgURL, imgURL)   

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
