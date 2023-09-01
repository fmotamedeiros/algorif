import { DashboardLayout } from '../components/dashboard-layout';
import { UserDetails } from '../requestsFirebase/allGetRequests';
import { Loader } from '../requestsFirebase/loader';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Head from 'next/head';

const DatasQuestion = dynamic(import('../components/createQuestion/datasQuestion'), { ssr: false });

const CreateQuestion = () => {
    const [coders, setCoders] = useState();
    UserDetails(setCoders);

    // if (!coders || coders.teacher === false) {
    //     return <Loader />;
    // }

    return (
        <>
            <Head>
                <title>
                    Criar questão
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
