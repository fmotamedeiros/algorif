import React, { FormEvent } from "react";
import { Box } from "@mui/system";
import { Card, CardContent, Typography } from "@mui/material";
import CustomTextField from "../customTextField";
import { useFormik } from "formik";
import * as Yup from 'yup';

function SearchQuestion() {

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .max(255)
        }),
        onSubmit: () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
                .then(async (response) => {
                    //console.log(JSON.stringify(response));
                    localStorage.setItem("@AuthFirebase:metadata", JSON.stringify(response.user))
                    authContext.signIn(response.user);
                    Router
                        .push('/')
                        .catch(console.error);
                })
                .catch((error) => {
                    console.log(error);
                    document.querySelector("#error-message").innerHTML = "Email e/ou Senha Incorretos";
                });
        }
    });


    return (
        <Card
        // sx={{ p: 3 }}
        >
            <CardContent>
                <Typography>
                    Pesquisar Questão
                </Typography>
                <form onSubmit={handleSubmit}>
                    <CustomTextField
                        label="Pesquise aqui"
                        name="search"
                        type="text"
                        onBlur={formik.handleBlur}
                        formik={formik}
                    />

                </form>
            </CardContent>
        </Card>
    );
}

export default SearchQuestion;