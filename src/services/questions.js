import { doc, getDoc, getDocs, query, collection } from 'firebase/firestore';
import { auth } from '../contexts/auth-context';

export const QuestionService = {
    getSuggestions: async function () {
        const categoriesRef = collection(database, 'categories');
        const data = await getDocs(categoriesRef);
        const categories = [];

        data.forEach(categorie => {
            categories.push(categorie.id);
        });

        return categories;
    },
    getQuestionsSolved: async function () {
        console.log(auth.currentUser.uid);
    }
}
