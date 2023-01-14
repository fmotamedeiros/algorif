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
import { SetContext } from '../../contexts/setFirebase';
import { Loader } from '../../requestsFirebase/loader';
import { PictureUser } from '../../requestsFirebase/allGetRequests';
import { useRouter } from 'next/router';


export const AccountProfile = (props) => {
  const router = useRouter()
  const setContext = useContext(SetContext);
  const [imgURL, setImgURL] = useState("")

  const handleUpload = async (event) => {
    event.preventDefault()
    const file = event.target[0]?.files[0]

    if (!file) return;

    await setContext.setPictureUser(file)
    router.reload()
  }

  PictureUser(setImgURL)

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
          {imgURL ?
            <Avatar
            src={imgURL}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          : <Loader /> }
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
