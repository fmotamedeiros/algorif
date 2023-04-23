import { useState } from "react";
import { TextField, Grid, Button, Popover, DialogTitle, DialogContent } from "@mui/material";

const Description = ({ descriptionData }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <TextField
                fullWidth
                multiline
                disabled
                value={descriptionData.detailedDescription}
            />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        label="Valor da Entrada"
                        value={descriptionData.test[0].input}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        multiline
                        disabled
                        label="Valor da Saída"
                        value={descriptionData.test[0].output}
                    />
                </Grid>
            </Grid>

            <div className="bottom-6 left-20 p-2 flex justify-start items-center lg:fixed">
                <img src="/static/images/chatbot.png" alt="Cartoon Character" className="w-20 h-20 mr-2" />
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Iniciar conversa
                </Button>
            </div>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <iframe
                    allow="microphone;"
                    width="350"
                    height="430"
                    src="https://console.dialogflow.com/api-client/demo/embedded/4d792e49-e0aa-4a22-b515-77be57ce4804"
                />
            </Popover>
        </>
    );
};

export default Description;