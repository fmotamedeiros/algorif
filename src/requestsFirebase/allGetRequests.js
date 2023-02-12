import { useContext, useEffect, useState } from "react";
import { GetContext } from "../contexts/getFirebase";

//account.js
export const UserDetails = (setCoders) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const datasUsers = () => {
        getContext.getUserDetails().then((value) => {
            setCoders(value);
            setIsLoaded(true);
        }).catch(console.error);
    };

    useEffect(() => {
        if (!isLoaded) {
            datasUsers();
        }
    }, [isLoaded]);
};

//dashboard-navbar.js
//account-profile.js
export const PictureUser = (setImgURL) => {
    const getContext = useContext(GetContext);
    getContext.getPictureUser(setImgURL)
}

//[question].js
export const DescriptionTask = (setDescriptionData, nameQuestion) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const Description = () => {
        getContext.getDescription(setDescriptionData, nameQuestion);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            Description();
        }
    }, [isLoaded]);
};

//ranking.js
export const AllRanking = (setRanking) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const Ranking = () => {
        getContext.getRanking(setRanking);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            Ranking();
        }
    }, [isLoaded]);
}

export const AllTopics = (setTopics) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const Topics = () => {
        getContext.getTopics(setTopics);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            Topics();
        }
    }, [isLoaded]);
}

export const GetQuestions = (nameTopic, setQuestions) => {
    const getContext = useContext(GetContext);

    const allQuestions = () => {
        getContext.getQuestions(nameTopic).then(value => {
            setQuestions(value);
        })
            .catch(console.error);
    };

    useEffect(() => {
        allQuestions();
    }, [nameTopic]);
}

export const GetTaskSolved = setTaskSolved => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const allTasksSolved = () => {
        getContext.getTaskSolved().then(value => {
            setTaskSolved(value);
            setIsLoaded(true);
        })
            .catch(console.error);
    };

    useEffect(() => {
        if (!isLoaded) {
            allTasksSolved();
        }
    }, [isLoaded]);
};

export const GetDifficultRate = (setBarData) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const DifficultRate = () => {
        getContext.getDifficultRate(setBarData);
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!isLoaded) {
            DifficultRate();
        }
    }, [isLoaded]);
};

export const GetTasksTopic = (setChartData) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const DifficultRate = () => {
        getContext.getTasksTopic(setChartData);
        setIsLoaded(true);
    }

    useEffect(() => {
        if (!isLoaded) {
            DifficultRate();
        }
    }, [isLoaded]);
};

export const GetDatasQuestion = (setCreatedQuestions) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const createdQuestions = () => {
        getContext.getCreatedQuestions(setCreatedQuestions);
        setIsLoaded(true);
    }
    useEffect(() => {
        if (!isLoaded) {
            createdQuestions();
        }
    }, [isLoaded]);
};