import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout';
import { DescriptionTask } from '../../requestsFirebase/allGetRequests';
import { Loader } from '../../requestsFirebase/loader';

const UpdateDatasQuestion = dynamic(import('../../components/editQuestions/updateDatasQuestion'), { ssr: false })

const Edit = () => {
    const router = useRouter()
    const [descriptionData, setDescriptionData] = useState(null)

    DescriptionTask(router.query.edit, setDescriptionData)

    if (!descriptionData) {
        return <> <Loader /> </>
    }

    return (
        <>
            <Head>
                <title>
                    Editar Questão
                </title>
            </Head>
            <UpdateDatasQuestion descriptionData={descriptionData} />
        </>
    )
};

Edit.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Edit;