import {Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Box, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

export default function ErrorHandler({error}: { error: Error }) {
    return (
        <Alert severity="error">
            <>
                <AlertTitle>Произошла ошибка: {error.message}</AlertTitle>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="error-content"
                        id="error-header"
                    >
                        <Typography>Подробности</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="pre" display="raw">
                            <>
                                {error.cause}
                                {error.stack}
                            </>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </>
        </Alert>
    )
}