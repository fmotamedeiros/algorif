import { doc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { database } from './firebase';


export const TestService = {
    getCategories: async function () {
        const ref = collection(database, 'coders');
        const myQuery = query(ref);
        const coders = await getDocs(myQuery);

        coders.forEach(doc => {
            console.log(doc.data());
        });
    }
}
