import { getDocs, collection } from 'firebase/firestore';
import { database } from './firebase';

export const CategoryService = {
    getAll: async function () {
        const categoriesRef = collection(database, 'categories');
        const data = await getDocs(categoriesRef);
        const categories = [];

        data.forEach(categorie => {
            categories.push(categorie.id);
        });

        return categories;
    }
}
