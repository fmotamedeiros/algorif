import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@mui/material';
import { NavItem } from './nav-item';
import { UserDetails } from '../requestsFirebase/allGetRequests';
import { getNavLinks } from './datas/navLinks';

export const DashboardMinimalSideBar = () => {

    const [coders, setCoders] = useState(null)

    UserDetails(setCoders)

    if (coders) {
        const navLinks = getNavLinks(coders.teacher)

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
                        <div className='my-[48px]'
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            {navLinks.map((item) => (
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
