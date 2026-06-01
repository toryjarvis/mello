// context for success/error messages
// loading states, actions, triggers, etc

import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    function showFeedback(msg, sev) {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <FeedbackContext.Provider value = {{ showFeedback}}>
            { children }
            <Snackbar
                open = {open}
                autoHideDuration = {2500}
                onClose = {handleClose}
                anchorOrigin = {{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert 
                onClose = { handleClose }
                severity = { severity }
                variant = "filled"
                >
                    { message }
                </Alert>
            </Snackbar>
        </FeedbackContext.Provider>
    )
}

export const useFeedback = () => {
    return useContext(FeedbackContext);
}