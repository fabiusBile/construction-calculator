import FrameCalculator from "./FrameCalculator";
import {Box, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";

function FrameCalculatorView({calculator}: { calculator: FrameCalculator }) {
    return (
        <Box display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={1}>
            <TextField
                required
                id="outlined-required"
                label="Ширина"
                value={calculator.width}
                type="number"
                InputProps={{
                    inputProps: {min: 0},
                    endAdornment: <InputAdornment position="end">см.</InputAdornment>
                }}
                onChange={(e) => {
                    calculator.setWidth(Number(e.target.value))
                }}
            />
            <TextField
                required
                id="outlined-required"
                label="Высота"
                value={calculator.height}
                type="number"
                InputProps={{
                    inputProps: {min: 0},
                    endAdornment: <InputAdornment position="end">см.</InputAdornment>
                }}
                onChange={(e) => {
                    calculator.setHeight(Number(e.target.value))
                }}
            />
            <FormControl fullWidth>
                <InputLabel id="frame-material-label">Материал</InputLabel>
                <Select
                    labelId="frame-material-label"
                    id="frame-material"
                    label="Материал"
                    value={calculator.currentMaterialId}
                    onChange={(e) => {
                        calculator.setCurrentMaterial(Number(e.target.value))
                    }}
                >
                    {calculator.materials.map((value, index) =>
                        (<MenuItem key={index} value={index}>{value.name}</MenuItem>)
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default observer(FrameCalculatorView);