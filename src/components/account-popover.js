import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { getAuth } from "firebase/auth";
import NextLink from 'next/link';
import { GetContext } from '../contexts/getFirebaseContext';
import { AuthContext } from '../contexts/auth-context';

export const AccountPopover = (props) => {
  
  const [coders, setCoders] = useState(null)
  const authContext = useContext(AuthContext);
  const getContext = useContext(GetContext);

  const datasUsers = () => {
    getContext.getUserDetails().then((value) =>
      setCoders(value)
    ).catch(console.error)

  }

  useEffect(() => {
    datasUsers();

  }, []);

  const auth = getAuth();

  const { anchorEl, onClose, open, ...other } = props;

  const handleSignOut = async () => {
    onClose?.();
    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      await auth.signOut();

      // Update Auth Context state
      authContext.signOut();

      // Redirect to sign-in page
      Router
        .push('/login')
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };
if (coders) {
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >

          <NextLink
              href="/account"
              passHref
            >
              <a>
              <Typography variant="overline">
                Account
              </Typography>
              </a>
          </NextLink>   
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {coders.userName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
