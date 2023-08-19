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


export const AccountProfile = ({ coders }) => {
  const router = useRouter()
  const setContext = useContext(SetContext);
  const [imgURL, setImgURL] = useState("")

  const handleFileUpload = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]

    if (!file) return;

    await setContext.setPictureUser(file)
    router.reload()
  }

  PictureUser(setImgURL)

  return (
    //<form onSubmit={formik.handleSubmit}>
    <Card
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
            : <Loader />}
          <Typography
            gutterBottom
            variant="h5"
          >
            {coders.userName}
          </Typography>
          <Typography
            color="neutral.400"
            variant="body2"
          >
            {`${coders.city} - ${coders.state}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions >
        <Button
          fullWidth
          color="primary"
          variant="text"
          component="label"
        >
          Carregar foto
          <input
            onChange={handleFileUpload}
            hidden
            type="file"
          />
        </Button>
      </CardActions>


    </Card>
    //</form>
  )
};
