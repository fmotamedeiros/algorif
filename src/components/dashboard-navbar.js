import { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { AccountPopover } from './account-popover';
import { Logo } from './logo';
import NextLink from 'next/link';
import { GetContext } from '../contexts/getFirebaseContext';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const getContext = useContext(GetContext);
  const [imgURL, setImgURL] = useState("")
  const { onSidebarOpen, ...other } = props;
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  getContext.getPictureUser(setImgURL)  

  return (
    <>
    <DashboardNavbarRoot
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              color:"neutral.200",
              display: {
                xs: 'inline-flex',
                
              }
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
  
          <Box sx={{ px:1 }} />
          <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo />
              </a>
          </NextLink>
          <Box sx={{ flexGrow: 1 }} />
          
          <Tooltip title="Notifications">
            <IconButton sx={{ 
              color:"neutral.200",
              ml: 1 }}>
              <Badge
                badgeContent={4}
                color="primary"
                variant="dot"
              >
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src={imgURL}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
