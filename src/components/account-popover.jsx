import { useContext, useState } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useAuth } from '../contexts/auth-context';
import { UserDetails } from '../requestsFirebase/allGetRequests';

export const AccountPopover = ({ anchorEl, onClose, open, ...other }) => {

    const auth = useAuth();

    const [coders, setCoders] = useState(null)

    UserDetails(setCoders)

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
                    <MenuItem onClick={() => auth.signOut()}>
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
