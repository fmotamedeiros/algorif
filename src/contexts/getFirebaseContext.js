import { createContext } from "react";
import { auth, db, storage } from "./auth-context";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
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
        console.log(querySnapshot.size)
        querySnapshot.forEach((doc) => {
            topics.push(doc.id);
            setTopics(topics)
        })
    }

    const getQuestions = async (topic) => {
        const ref = doc(db, "categories", topic);
        const data = await getDoc(ref)
        console.log(JSON.stringify(data.data()))
        const questions = JSON.stringify(data.data())
        return questions;
    }

    return (
        <GetContext.Provider
            value={{
                getUserDetails,
                getPictureUser,
                getTopics,
                getQuestions

            }}
        >
            {children}
        </GetContext.Provider>
    );
}
