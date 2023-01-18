import { useContext, useEffect } from "react";
import { GetContext } from "../contexts/getFirebase";

//account.js
export const UserDetails = (setCoders) => {
    const getContext = useContext(GetContext);
    const loaded = false

    const datasUsers = () => {
        getContext.getUserDetails().then((value) =>
            setCoders(value)
        ).catch(console.error)

    }
    useEffect(() => {
        if (loaded) {
            return
        }
        datasUsers();
        loaded = true
    }, []);
}

//dashboard-navbar.js
//account-profile.js
export const PictureUser = (setImgURL) => {
    const getContext = useContext(GetContext);
    getContext.getPictureUser(setImgURL)
}

//[question].js
export const DescriptionTask = (nameQuestion, setDescriptionData) => {
    const loaded = false
    const getContext = useContext(GetContext);
    const description = () => {
        getContext.getDescription(nameQuestion).then((value) =>
            setDescriptionData(value)
        ).catch(console.error)
    }

    useEffect(() => {
        if (loaded) {
            return
        }
        description();
        loaded = true
    }, []);
}

//ranking.js
export const AllRanking = (setRanking) => {
    const getContext = useContext(GetContext);

    const Ranking = () => {
        getContext.getRanking(setRanking)
    }

    useEffect(() => {
        Ranking();
    }, []);
}

export const AllTopics = (setTopics) => {
    const getContext = useContext(GetContext);
    const loaded = false

    const Topics = () => {
        getContext.getTopics(setTopics)
    }

    useEffect(() => {
        if (loaded) {
            return
        }
        Topics();
        loaded = true
    }, []);
}

export const GetQuestions = (nameQuestion, setQuestions) => {
    const getContext = useContext(GetContext);
    const loaded = false

    const allQuestions = () => {
        getContext.getQuestions(nameQuestion).then((value) =>
          setQuestions(value)
        ).catch(console.error)
      }
    
      useEffect(() => {
        if (loaded) {
          return
        }
        allQuestions();
        loaded = true
      }, [nameQuestion]);
}

export const GetTaskSolved = (setTaskSolved) => {
    const getContext = useContext(GetContext);
    const loaded = false

    const allTasksSolved = () => {
        getContext.getTaskSolved().then((value) =>
            setTaskSolved(value)
        ).catch(console.error)
      }
    
      useEffect(() => {
        if (loaded) {
          return
        }
        allTasksSolved();
        loaded = true
      }, []);
}