import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { User as UserIcon } from '../icons/user';
import { NavItem } from './nav-item';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { UserDetails } from '../contexts/userDetails';
import TaskIcon from '@mui/icons-material/Task';

const teacher_true = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/topics',
    icon: (<TaskIcon fontSize="small" />),
    title: 'Exercícios'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/createQuestion',
    icon: (<AddTaskIcon fontSize="small" />),
    title: 'Create Question'
  },
];

const teacher_false = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/topics',
    icon: (<TaskIcon fontSize="small" />),
    title: 'Exercícios'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },

];


export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();

  const [coders, setCoders] = useState(null)

  UserDetails(setCoders)

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  if (coders) {
    const items = []
    if (coders.teacher == true) {
      items = teacher_true
    } else {
      items = teacher_false
    }

    return (
      <>
        <Drawer
          anchor="left"
          onClose={onClose}
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: 'neutral.900',
              width: 280
            }
          }}
          sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
          variant="temporary"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <div>
              <Box sx={{ p: 3 }}>
                <NextLink
                  href="/"
                  passHref
                >
                  <a>
                    <img src='/logo.png' />
                  </a>
                </NextLink>
              </Box>
              <Box sx={{ px: 2 }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                    py: '11px',
                    borderRadius: 1
                  }}
                >
                  <div>
                    <Typography
                      color="inherit"
                      variant="subtitle1"
                    >
                      {coders.userName}
                    </Typography>
                    <Typography
                      color="neutral.400"
                      variant="body2"
                    >
                      Conquistou
                      {' '}
                      : {coders.score} Pontos
                    </Typography>
                  </div>
                </Box>
              </Box>
            </div>
            <Divider
              sx={{
                borderColor: '#2D3748',
                my: 3
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              {items.map((item) => (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </Box>
            <Divider sx={{ borderColor: '#2D3748' }} />
          </Box>
        </Drawer>
      </>
    );
  };
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
