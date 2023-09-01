import { CategoryService } from "../../services/categories";


export const getNavTopics = async () => {
    const topics = await CategoryService.getAll();
    const navTopics = [];

    topics.forEach((topic) => {
        navTopics.push({ label: topic });
    });

    navTopics = [...navTopics, { label: '' }];

    console.log(navTopics);

    return navTopics;
}