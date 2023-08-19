import { useContext, useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Router from "next/router";
import { SetContext } from "../../contexts/setFirebase";
import { nanoid } from 'nanoid';

export const CreateGroup = ({ allQuestions }) => {
    const [groupName, setGroupName] = useState("");
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const setContext = useContext(SetContext);

    const createGroup = async () => {
        if (!groupName) {
            alert("Por favor, insira um nome para o grupo.");
            return;
        }
        const groupKey = nanoid(8);
        await setContext.setCreateGroup(groupName, selectedQuestions, groupKey);
        alert("Grupo criado com Sucesso");
        Router.reload();
    };

    const addAndRemoveQuestion = (question) => {
        if (selectedQuestions.includes(question)) {
          const updatedQuestions = selectedQuestions.filter(
            (selectedQuestion) => selectedQuestion !== question
          );
          setSelectedQuestions(updatedQuestions);
        } else {
          setSelectedQuestions([...selectedQuestions, question]);
        }
      };
      

    const searchQuestion = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        const filtered = allQuestions.filter((question) =>
            question.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredQuestions(filtered);
    };

    const handleOpenPopover = (event) => {
        setFilteredQuestions(allQuestions);
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "popover-questions" : undefined;

    return (
        <div>
            <div className="text-2xl font-bold mb-4">Criar Grupo</div>
            <div className="mb-4">
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Nome do grupo"
                    className="p-2 border border-gray-300 rounded-md w-72 text-white bg-[#1F2937]"
                />
            </div>
            <div className="text-xl font-bold mb-2">Questões</div>
            <Button onClick={handleOpenPopover} variant="contained" className="w-full">
                Adicionar Questão
            </Button>
            <div className="mt-2">
                {selectedQuestions.map((question, index) => (
                    <div
                        key={index}
                        className="p-2 border border-gray-300 rounded-md mt-2"
                    >
                        {question.title}
                    </div>
                ))}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <div className="p-4">

                    <div className="flex justify-between mb-4 items-center">
                        <div className="text-lg font-bold">Todas as Questões</div>

                        <button onClick={handleClosePopover} className="text-gray-500">
                            X
                        </button>
                    </div>
                    <TextField
                        type="text"
                        value={searchTerm}
                        onChange={searchQuestion}
                        placeholder="Pesquisar questões"
                        className="w-full mb-2"
                    />
                    <div>
                        {filteredQuestions.map((question, index) => (
                            <div
                                key={index}
                                onClick={() => addAndRemoveQuestion(question)}
                                className={`cursor-pointer ${selectedQuestions.includes(question) ? "text-green-400" : "" } p-2 border border-gray-300 rounded-md mt-2`}
                            >
                                {question.title}
                            </div>
                        ))}
                    </div>
                </div>
            </Popover>

            <Button
                onClick={createGroup}
                color="primary"
                variant="outlined"
                className="w-full mt-4"
            >
                Criar Grupo
            </Button>
        </div>
    );
};