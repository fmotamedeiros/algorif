import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { UserDetails } from '../requestsFirebase/allGetRequests';
import { Loader } from '../requestsFirebase/loader';

const DatasQuestion = dynamic(import('../components/createQuestion/datasQuestion'), { ssr: false })

const CreateQuestion = () => {
    const [coders, setCoders] = useState()
    UserDetails(setCoders)

    if (!coders || coders.teacher === false) {
        return <> <Loader /> </>
    }

    return(
    <>
        <Head>
            <title>
                Create Question
            </title>
        </Head>
        <DatasQuestion />
    </>
    )
};

CreateQuestion.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default CreateQuestion;