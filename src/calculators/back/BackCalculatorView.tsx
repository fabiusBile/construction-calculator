import BackCalculator from "./BackCalculator";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {observer} from "mobx-react-lite";

function BackCalculatorView({calculator} : {calculator: BackCalculator}){
    return (
        <Box>
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

export default observer(BackCalculatorView);