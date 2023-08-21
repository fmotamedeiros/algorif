import Head from 'next/head';
import { Box } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { QuestionsTopics } from '../components/quests/questionsTopics'
import { QuestionsSuggest } from '../components/quests/questionsSuggest';
import SearchQuestion from '../components/quests/searchQuestion';

const Topics = () => {

    return (
        <>
            <Head>
                <title>
                    Tópicos
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 4
                }}
            >
                <div className='px-[5%]'>
                    <QuestionsTopics />
                    <div className="pt-8" />
                    <SearchQuestion />
                    <div className='pt-8' />
                    <QuestionsSuggest />

                </div>
            </Box>
        </>
    )
};

Topics.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Topics;
