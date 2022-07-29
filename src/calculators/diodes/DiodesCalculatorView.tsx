import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import DiodesCalculator from "./DiodesCalculator";
import {observer} from "mobx-react-lite";

function DiodesCalculatorView({calculator}: { calculator: DiodesCalculator }) {
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {calculator.powerSuppliesGroups.map((p, i) => (
                <Box key={i} py={1} display="grid" gridTemplateColumns="3fr 3fr 1fr" gap={1}>
                    <FormControl fullWidth>
                        <InputLabel id={"ps-type-label-" + i}>Тип блока питания</InputLabel>
                        <Select
                            labelId={"ps-type-label-" + i}
                            id={"ps-type-" + i}
                            label="Тип блока питания"
                            value={p.currentPowerSupplyId}
                            onChange={(e) => {
                                const index = Number(e.target.value);
                                p.setPowerSupply(calculator.powerSupplies[index].value, index)
                            }}
                        >
                            {
                                <MenuItem key={p.currentPowerSupplyId} value={p.currentPowerSupplyId}>{p.currentPowerSupply.name}</MenuItem>
                            }
                            {calculator.availablePowerSupplies.map(({value, index}) =>
                                (<MenuItem key={index} value={index}>{value.name}</MenuItem>)
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        required
                        label="Количество"
                        value={p.count}
                        type="number"
                        InputProps={{
                            inputProps: {min: 1},
                        }}
                        onChange={(e) => {
                            p.setCount(Number(e.target.value))
                        }}
                    />
                    <Button color="error" onClick={() => calculator.removePowerSuppliesGroup(i)}>Удалить</Button>
                </Box>
            ))}
            {
                calculator.availablePowerSupplies.length > 0
                    ? <Button sx={{p: 2}} onClick={() => calculator.addPowerSuppliesGroup()}>Добавить блоки питания</Button>
                    : <></> 
            }
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
                                d.setDiodeType(calculator.diodeTypes[index].value, index)
                            }}
                        >
                            {<MenuItem key={d.currentDiodeTypeId} value={d.currentDiodeTypeId}>{d.diodeType.power}</MenuItem>}
                            {calculator.availableDiodes.map(({value, index}) =>
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
            {
                calculator.availableDiodes.length > 0
                    ? <Button sx={{p: 2}} onClick={() => calculator.addDiodesGroup()}>Добавить светодиоды</Button>
                    : <></>
            }
        </Box>
    )
}

export default observer(DiodesCalculatorView);