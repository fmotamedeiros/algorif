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

export const GetTopicQuestions = (nameTopic, setQuestions) => {
    const getContext = useContext(GetContext);

    const topicQuestions = () => {
        getContext.getQuestions(nameTopic).then(value => {
            setQuestions(value);
        })
            .catch(console.error);
    };

    useEffect(() => {
        topicQuestions();
    }, [nameTopic]);
}

export const GetTaskSolved = (setTaskSolved) => {
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

export const GetQuestionsSuggest = (setUnansweredQuestions) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const questionsSuggest = () => {
        getContext.getUnansweredQuestions(setUnansweredQuestions)
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!isLoaded) {
            questionsSuggest();
        }
    }, [isLoaded]);
};

export const GetTasksWeekend = (setAnsweredQuestions) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const questionsAnswered = () => {
        getContext.getTasksWeekend(setAnsweredQuestions)
        setIsLoaded(true);
    };

    useEffect(() => {
        if (!isLoaded) {
            questionsAnswered();
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

export const GetUserGroups = (setUserGroups) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const userGroups = () => {
        getContext.getUserGroups(setUserGroups);
        setIsLoaded(true);
    }
    useEffect(() => {
        if (!isLoaded) {
            userGroups();
        }
    }, [isLoaded]);
};

export const GetQuestionsByGroupName = (groupName, setQuestions) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const groupQuestions = () => {
        getContext.getQuestionsByGroupName(groupName, setQuestions);
        setIsLoaded(true);
    }
    useEffect(() => {
        if (!isLoaded) {
            groupQuestions();
        }
    }, [isLoaded]);
};

export const GetAllQuestions = (setAllQuestions) => {
    const getContext = useContext(GetContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const datasUsers = () => {
        getContext.getAllQuestions().then((value) => {
            setAllQuestions(value);
            setIsLoaded(true);
        }).catch(console.error);
    };

    useEffect(() => {
        if (!isLoaded) {
            datasUsers();
        }
    }, [isLoaded]);
};
