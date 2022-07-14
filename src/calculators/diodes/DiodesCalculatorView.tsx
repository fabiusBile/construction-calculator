import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import DiodesCalculator from "./DiodesCalculator";
import {observer} from "mobx-react-lite";

function DiodesCalculatorView({calculator}: { calculator: DiodesCalculator }) {
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <FormControl fullWidth>
                <InputLabel id={"power-supply-label"}>Блок питания</InputLabel>
                <Select
                    labelId={"power-supply-label"}
                    id={"power-supply"}
                    label="Блок питания"
                    value={calculator.currentPowerSupplyId}
                    onChange={(e) => {
                        calculator.setPowerSupply(Number(e.target.value))
                    }}
                >
                    {calculator.powerSupplies.map((value, index) =>
                        (<MenuItem key={index} value={index}>{value.name}</MenuItem>)
                    )}
                </Select>
            </FormControl>
            {calculator.diodesGroups.map((d, i) => (
                <Box key={i} py={1} display="grid" gridTemplateColumns="3fr 3fr 1fr" gap={1}>
                    <FormControl fullWidth>
                        <InputLabel id={"diode-type-label-" + i}>Тип светодиода</InputLabel>
                        <Select
                            labelId={"diode-type-label-" + i}
                            id={"diode-type-" + i}
                            label="Тип светодиода"
                            value={d.currentDiodeTypeId}
                            onChange={(e) => {
                                const index = Number(e.target.value);
                                d.setDiodeType(calculator.diodeTypes[index], index)
                            }}
                        >
                            {calculator.diodeTypes.map((value, index) =>
                                (<MenuItem key={index} value={index}>{value.power}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        label="Количество"
                        value={d.count}
                        type="number"
                        InputProps={{
                            inputProps: {min: 1},
                        }}
                        onChange={(e) => {
                            d.setCount(Number(e.target.value))
                        }}
                    />
                    <Button color="error" onClick={() => calculator.removeDiodesGroup(i)}>Удалить</Button>
                </Box>
            ))}
            <Button sx={{p: 2}} onClick={() => calculator.addDiodesGroup()}>Добавить светодиоды</Button>
        </Box>
    )
}

export default observer(DiodesCalculatorView);