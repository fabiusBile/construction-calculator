import {Box, InputAdornment, TextField} from "@mui/material";
import {MainTextInput} from "./MainTextInput";
import FilteredTextField from "../FilteredTextField";
import {observer} from "mobx-react-lite";

/**
 * Регулярное выражение для проверки текста.
 */
const textRegex = /^[А-яA-z,."'!\d-\s+=?]*$/gm;

function MainTextInputView({mainTextInput}: { mainTextInput: MainTextInput }) {
    return (
        <Box display="grid" gridTemplateColumns="3fr 1fr 1fr 1fr" gap={1}>
            <FilteredTextField
                sx={{
                    flex: 1
                }}
                required
                label="Текст вывески"
                filterRegex={textRegex}
                value={mainTextInput.text}
                onChange={(e) => mainTextInput.setText(e.target.value)}>
            </FilteredTextField>
            <TextField
                required
                label="Размер шрифта"
                value={mainTextInput.fontSize}
                type="number"
                InputProps={{
                    inputProps: {min: 1, max: mainTextInput.maxFontSize},
                    endAdornment: <InputAdornment position="end">см.</InputAdornment>
                }}
                onChange={(e) => {
                    mainTextInput.setFontSize(Number(e.target.value))
                }}
            />
            <TextField
                required
                label="Длина линии"
                value={mainTextInput.line}
                type="number"
                InputProps={{
                    inputProps: {min: 0},
                    endAdornment: <InputAdornment position="end">см.</InputAdornment>
                }}
                onChange={(e) => {
                    mainTextInput.setLine(Number(e.target.value))
                }}
            />
            <TextField
                required
                label="Наценка"
                value={mainTextInput.markup}
                type="number"
                InputProps={{
                    inputProps: {min: 0},
                    endAdornment: <InputAdornment position="end">%</InputAdornment>
                }}
                onChange={(e) => {
                    mainTextInput.setMarkup(Number(e.target.value))
                }}
            />
        </Box>
    )
}

export default observer(MainTextInputView);