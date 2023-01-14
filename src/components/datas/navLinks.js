import TaskIcon from '@mui/icons-material/Task';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { Cog as CogIcon } from '../../icons/cog';
import { User as UserIcon } from '../../icons/user';
import AddTaskIcon from '@mui/icons-material/AddTask';

export const getNavLinks = (isTeacher) => {
    const navLinks = [
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
    if (isTeacher) {
        navLinks.push({
            href: '/createQuestion',
            icon: (<AddTaskIcon fontSize="small" />),
            title: 'Create Question'
        });
    }
    return navLinks;
}