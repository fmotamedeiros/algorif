import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { User as UserIcon } from '../icons/user';
import { NavItem } from './nav-item';
import TaskIcon from '@mui/icons-material/Task';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { UserDetails } from '../contexts/userDetails';

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

export const DashboardMinimalSideBar = () => {

    const [coders, setCoders] = useState(null)
  
    UserDetails(setCoders)
  
    if (coders) {
      const items = []
      if (coders.teacher == true) {
        items = teacher_true
      } else {
        items = teacher_false
      }
  
      return (
        <div className='fixed'>
          <Drawer className='drawer'
            anchor="left"
            PaperProps={{
              sx: {
                backgroundColor: 'neutral.800',
                width: 80
              }
            }}
            variant="permanent"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div className='my-[64px]'
              />
              <Box sx={{ flexGrow: 1 }}>
                {items.map((item) => (
                  <NavItem
                    key={item.title}
                    icon={item.icon}
                    href={item.href}
                    titleLabel={item.title}
                  />
                ))}
              </Box>
            </Box>
          </Drawer>
        </div>
      );
    };
  }

DashboardMinimalSideBar.propTypes = {
  onSidebarOpen: PropTypes.func
};
