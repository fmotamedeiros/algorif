import TaskIcon from '@mui/icons-material/Task';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { Cog as CogIcon } from '../../icons/cog';
import { User as UserIcon } from '../../icons/user';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GroupIcon from '@mui/icons-material/Group';

export const getNavLinks = (isTeacher) => {
    const navLinks = [
        {
            href: '/',
            icon: (<ChartBarIcon fontSize="small" />),
            title: 'Dashboard'
        },
        {
            href: '/account',
            icon: (<UserIcon fontSize="small" />),
            title: 'Perfil'
        },
        {
            href: '/topics',
            icon: (<TaskIcon fontSize="small" />),
            title: 'Exercícios'
        },
        {
            href: '/classStudents',
            icon: (<GroupIcon fontSize="small" />),
            title: 'Turmas'
        },
        {
            href: '/settings',
            icon: (<CogIcon fontSize="small" />),
            title: 'Configurações'
        },
    ];
    if (isTeacher) {
        navLinks.push({
            href: '/createQuestion',
            icon: (<AddTaskIcon fontSize="small" />),
            title: 'Criar Questão'
        });
    }
    return navLinks;
}