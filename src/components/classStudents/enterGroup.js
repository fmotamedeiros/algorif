import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { UpdateContext } from "../../contexts/updateFirebase";
import KeyIcon from '@mui/icons-material/Key';

export const EnterGroup = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [groupKey, setGroupKey] = useState("");

    const updateContext = useContext(UpdateContext);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setGroupKey("");
    };

    const enterGroup = async () => {
        await updateContext.addAlunoToGroup(groupKey)
    };

    const handleGroupKeyChange = (event) => {
        setGroupKey(event.target.value);
    };

    return (
        <div>
            <div>
                <Button
                    startIcon={<KeyIcon/>}
                    variant="contained"
                    onClick={openDialog}
                >
                    Entrar em uma Turma
                </Button>

                <Dialog open={isDialogOpen} onClose={closeDialog}>
                    <DialogTitle>Insira a Chave da Turma</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Chave da Turma"
                            value={groupKey}
                            onChange={handleGroupKeyChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDialog}>Cancelar</Button>
                        <Button onClick={enterGroup} variant="contained" disabled={!groupKey}>
                            Entrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>


    );
};
