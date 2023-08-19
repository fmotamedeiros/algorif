import { useState } from "react";
import { Loader } from "../requestsFirebase/loader";
import { GetAllQuestions, UserDetails } from "../requestsFirebase/allGetRequests";
import { DashboardLayout } from "../components/dashboard-layout";
import Button from "@mui/material/Button";
import { CreateGroup } from "../components/classStudents/createGroup";
import { EnterGroup } from "../components/classStudents/enterGroup";
import { Dialog, DialogContent } from "@mui/material";
import { UserGroups } from "../components/classStudents/userGroups";
import AddIcon from '@mui/icons-material/Add';

const ClassStudents = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [coders, setCoders] = useState(null)
    const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

    GetAllQuestions(setAllQuestions)
    UserDetails(setCoders)

    if (!allQuestions || !coders) {
        return <Loader />;
    }

    const openCreateGroup = () => {
        setIsCreateGroupOpen(true);
    };

    const closeCreateGroup = () => {
        setIsCreateGroupOpen(false);
    };

    return (
        <div className="flex-1 items-center justify-center w-full max-w-6xl px-[5%] mx-auto p-6">
            <div className="flex items-center justify-between gap-2">
                <div className="font-bold text-2xl">Turmas</div>
                <div className="flex gap-4">
                    <div>
                        {coders.teacher && (
                            <Button variant="contained" onClick={openCreateGroup} startIcon={<AddIcon />}>
                                Criar Turma
                            </Button>
                        )}
                        <Dialog
                            open={isCreateGroupOpen}
                            onClose={closeCreateGroup}
                            aria-labelledby="create-group-dialog"
                        >
                            <DialogContent>
                                <CreateGroup allQuestions={allQuestions} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div>
                        <EnterGroup />
                    </div>
                </div>
            </div>
            <div className="pt-2 mb-4">
                <UserGroups />
            </div>
        </div>
    );
};

ClassStudents.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default ClassStudents;
