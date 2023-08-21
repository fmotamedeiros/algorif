import { doc, getDoc, getDocs, query, collection } from 'firebase/firestore';
import { database } from './firebase';

export const CategorieService = {
    getAll: async function () {
        const categoriesRef = collection(database, 'categories');
        const data = await getDocs(categoriesRef);
        const categories = [];

        data.forEach(categorie => {
            categories.push(categorie.id);
        });

        console.log(categories);
        return categories;
    }
}
