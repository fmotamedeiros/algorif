import { useState } from "react";
import { TextField, Grid, Button } from "@mui/material";

const ChatBox = ({ open }) => {
    return (
        <>
            {open && (
                <div>
                    <iframe
                        allow="microphone;"
                        width="350"
                        height="400"
                        src="https://console.dialogflow.com/api-client/demo/embedded/4d792e49-e0aa-4a22-b515-77be57ce4804"
                    />
                </div>
            )}
        </>
    );
};

const Description = ({ descriptionData }) => {
    const [open, setOpen] = useState(false);
    const [buttonText, setButtonText] = useState("Iniciar conversa");
    const [buttonColor, setButtonColor] = useState("primary");

    const handleClick = () => {
        if (!open) {
            setOpen(true);
            setButtonText("Encerrar conversa");
            setButtonColor("error");
        } else {
            setOpen(false);
            setButtonText("Iniciar conversa");
            setButtonColor("primary");
        }
    };

    return (
        <>
            <TextField fullWidth multiline disabled value={descriptionData.detailedDescription} />

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField fullWidth multiline disabled label="Valor da Entrada" value={descriptionData.test[0].input} />
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth multiline disabled label="Valor da Saída" value={descriptionData.test[0].output} />
                </Grid>
            </Grid>

            <div className="bottom-6 p-2 lg:fixed lg:pt-24">
                <div className="flex items-center">
                    <img src="/static/images/chatbot.png" alt="Cartoon Character" className="w-20 h-20 mr-2" />
                    <Button variant="contained" color={buttonColor} onClick={handleClick} >
                        {buttonText}
                    </Button>
                </div>
                <div className="pt-1">
                    <ChatBox open={open} />
                </div>
            </div>

        </>
    );
};

export default Description;
