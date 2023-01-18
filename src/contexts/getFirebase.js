import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const GetContext = createContext({ undefined });


export const GetProvider = (props) => {
    const { children } = props;

    const getUserDetails = async () => {
        const ref = doc(db, "coders", auth.currentUser.uid);
        const data = await getDoc(ref)

        return data.data();
    }

    const getPictureUser = async (setImgURL) => {
        if (auth.currentUser) {
            getDownloadURL(ref(storage, auth.currentUser.uid + ".png"))
                .then((url) => {
                    setImgURL(url)
                })
        }
    }

    const getTopics = async (setTopics) => {
        const allTopics = collection(db, "categories");
        const q = query(allTopics);
        const topics = []
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            topics.push(doc.id);
            setTopics(topics)
        })
    }

    const getQuestions = async (topic) => {
        const ref = doc(db, "categories", topic);
        const data = await getDoc(ref)
        const questions = data.data()
        return questions;
    }

    const getDescription = async (nameQuestion) => {
        const ref = doc(db, "descriptionQuestion", nameQuestion);
        const data = await getDoc(ref)
        return data.data();
    }

    const getRanking = async (setRanking) => {
        const rankingRef = collection(db, "coders");
        const q = query(rankingRef, orderBy("score", "desc"), where("score", ">", 0))
        const ranking = []
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            ranking.push(doc.data());
            setRanking(ranking)
        })
    }

    const getTaskSolved = async () => {
        const taskRef = doc(db, "taskSolved", auth.currentUser.uid);

        const data = await getDoc(taskRef)
        const tasksSolved = data.data()
        return tasksSolved;
    }

    return (
        <GetContext.Provider
            value={{
                getUserDetails,
                getPictureUser,
                getTopics,
                getQuestions,
                getDescription,
                getRanking,
                getTaskSolved,
            }}
        >
            {children}
        </GetContext.Provider>
    );
}
