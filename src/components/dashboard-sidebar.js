import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { Clock } from '../icons/clock';
import { UserDetails } from '../contexts/userDetails';

const teacher_true = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/topics',
    icon: (<Clock fontSize="small" />),
    title: 'Exercícios'
  },
  // {
  //   href: '/rankingTotal',
  //   icon: (<UsersIcon fontSize="small" />),
  //   title: 'Ranking'
  // },
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
    icon: (<UserAddIcon fontSize="small" />),
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
    icon: (<Clock fontSize="small" />),
    title: 'Exercícios'
  },
  // {
  //   href: '/rankingTotal',
  //   icon: (<UsersIcon fontSize="small" />),
  //   title: 'Ranking'
  // },
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
                    <Logo
                      sx={{
                        height: 50,
                        width: 100
                      }}
                    />
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
                      Acme Inc
                    </Typography>
                    <Typography
                      color="neutral.400"
                      variant="body2"
                    >
                      Your tier
                      {' '}
                      : Premium
                    </Typography>
                  </div>
                  <SelectorIcon
                    sx={{
                      color: 'neutral.500',
                      width: 14,
                      height: 14
                    }}
                  />
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
