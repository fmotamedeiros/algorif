import { doc, getDoc, addDoc, getDocs, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { database, storage } from './firebase';

export const AuthService = {
    register: async function (userInformations, auth) {

        const newUser = await createUserWithEmailAndPassword(auth, userInformations.email, userInformations.password);

        await setDoc(doc(database, "coders", auth.currentUser.uid), {
            email: userInformations.email,
            userName: userInformations.userName,
            state: userInformations.state,
            city: userInformations.city,
            phone: '',
            teacher: false,
            score: 0
        });

        const taskRef = doc(database, "taskSolved", auth.currentUser.uid);
        await setDoc(taskRef, {});

        const submissionsRef = doc(database, "submissions", auth.currentUser.uid);
        await setDoc(submissionsRef, {});

        const storageRef = ref(storage, auth.currentUser.uid + ".png");
        await uploadBytes(storageRef);
    }



}
