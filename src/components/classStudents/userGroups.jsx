import { useState } from "react";
import { GetUserGroups } from "../../requestsFirebase/allGetRequests";
import Link from "next/link";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export const UserGroups = () => {
    const [userGroups, setUserGroups] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedGroupKey, setSelectedGroupKey] = useState("");

    GetUserGroups(setUserGroups);

    const handleMenuOpen = (event, groupKey) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedGroupKey(groupKey);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedGroupKey("");
    };

    const copyGroupKey = () => {
        navigator.clipboard.writeText(selectedGroupKey);
        handleMenuClose();
    };

    return (
        <div>
            {userGroups.length > 0 ? (
                <div className="mt-4">
                    {userGroups.map((group) => (
                        <div key={group.id}>
                            <Link href={`/groups/${group.name}`}>
                                <div className="flex items-center p-4 border mb-3 border-gray-500 hover:border-green-500 w-full rounded hover:text-green-400">
                                    <div>{group.name}</div>
                                    <MoreVertIcon
                                        className="ml-auto cursor-pointer hover:text-green-200"
                                        onClick={(event) => handleMenuOpen(event, group.groupKey)}
                                    />
                                </div>
                            </Link>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                disablePortal
                            >
                                <MenuItem onClick={copyGroupKey}>
                                    Key: {selectedGroupKey}
                                    <Tooltip title="Copiar">
                                        <IconButton
                                            size="small"
                                            color="inherit"
                                        >
                                            <FileCopyIcon />
                                        </IconButton>
                                    </Tooltip>
                                </MenuItem>
                            </Menu>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 mt-4 text-lg">
                    Você não pertence a alguma turma
                </div>
            )}
        </div>
    );
};
