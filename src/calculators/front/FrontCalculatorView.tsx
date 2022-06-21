import FrontCalculator from "./FrontCalculator";
import {Box, FormControl, InputLabel, ListSubheader, MenuItem, Select} from "@mui/material";
import {observer} from "mobx-react-lite";

function FrontCalculatorView({calculator} : {calculator: FrontCalculator}){
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
                        value.price === 0 
                            ? (<ListSubheader key={index}>{value.name}</ListSubheader>)
                            : (<MenuItem key={index} value={index}>{value.name}</MenuItem>)
                    )}
                </Select>
            </FormControl>
        </Box>
    )
}

export default observer(FrontCalculatorView);