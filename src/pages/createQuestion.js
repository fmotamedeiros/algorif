import dynamic from 'next/dynamic';
import Head from 'next/head';
import { DashboardLayout } from '../components/dashboard-layout';

const DatasQuestion = dynamic(import('../components/createQuestion/datasQuestion'), { ssr: false })

const CreateQuestion = () => {
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