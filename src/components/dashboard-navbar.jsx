import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { AccountPopover } from './account-popover';
import NextLink from 'next/link';
import { PictureUser } from '../requestsFirebase/allGetRequests';
import { Logo } from './logo';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = ({ onSidebarOpen, ...other }) => {
    const [hideNavbar, setHideNavbar] = useState(false);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const difference = prevScrollPos - currentScrollPos;

            setHideNavbar(currentScrollPos > 64 && difference < 0);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [imgURL, setImgURL] = useState("")
    const settingsRef = useRef(null);
    const [openAccountPopover, setOpenAccountPopover] = useState(false);

    PictureUser(setImgURL)

    return (
        <>
            <DashboardNavbarRoot
                {...other}
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    display: hideNavbar ? "none" : "block",
                }}
            >
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
                            color: "neutral.200",
                            display: {
                                xs: 'inline-flex',

                            }
                        }}
                    >
                        <MenuIcon fontSize="medium" />
                    </IconButton>

                    <Box sx={{ px: 1 }} />
                    <NextLink
                        href="/"
                        passHref
                    >
                        <a className='hidden xs:block'>
                            <Logo viewWidth={490} width={190} height={135} imageWidth={453} />
                        </a>
                    </NextLink>
                    <Box sx={{ flexGrow: 1 }} />
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
