import React, {useEffect, useState} from 'react';
import ICalculatorBlock from "../calculators/interfaces/ICalculatorBlock";
import {
    Avatar,
    Box,
    CircularProgress,
    Container,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {blue} from "@mui/material/colors";
import {observer} from "mobx-react-lite";
import {MainTextInput} from "../shared/mainTextInput/MainTextInput";
import ceilTo2Decimals from "../shared/ceilTo2Decimals";
import ErrorHandler from "../shared/ErrorHandler";
import {ErrorBoundary} from "react-error-boundary";

const rouble = "₽";

function priceView({calculators, mainTextInput}: { calculators: ICalculatorBlock[], mainTextInput: MainTextInput }) {
    const total = ceilTo2Decimals(calculators.reduce((p, c) => p + (c.price).price, 0));
    const totalWithMarkup = ceilTo2Decimals(total + total * (mainTextInput.markup / 100));
    return (
        <Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                my: 2
            }}>
                <Typography variant="h5">Цена</Typography>
                <Divider sx={{flex: 1}}></Divider>
            </Box>
            <Paper square sx={{
                my: 1,
                p: 1
            }}>
                <Typography component="div">
                    <List>
                        {calculators.map((c, ci) => {
                            const price = c.price;
                            const detailsKeys = Object.keys(price.details);
                            return <ListItem key={ci}>
                                <Box sx={{flex: 1}}>
                                    <ListItemText>
                                        {c.name}
                                    </ListItemText>
                                    <List>
                                        {
                                            detailsKeys.map((key, di) => (
                                                <ListItem key={di}>
                                                    <Box sx={{
                                                        flex: 1,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}>
                                                        {key}
                                                        <Divider sx={{flex: 1}}></Divider>
                                                        {price.details[key]} {rouble}
                                                    </Box>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Box>
                            </ListItem>
                        })
                        }
                    </List>
                </Typography>
            </Paper>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                my: 1
            }}>
                <Typography variant="h6">
                    Итого
                </Typography>
                <Divider sx={{flex: 1}}></Divider>
                <Typography>
                    {total} {rouble}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                my: 1
            }}>
                <Typography variant="h6">
                    Итого с наценкой
                </Typography>
                <Divider sx={{flex: 1}}></Divider>
                <Typography>
                    {totalWithMarkup} {rouble}
                </Typography>
            </Box>
        </Box>
    )
}

const PriceViewObservable = observer(priceView);

/**
 * Данные для передачи в страницу калькулятора.
 */
export interface CalculatorData {
    views: React.ReactElement[],
    calculators: ICalculatorBlock[]
}

/**
 * Базовый компонент для страниц калькулятора.
 * @param getCalculatorData Функция получения данных калькулятора.
 * @param mainTextInput Пользовательский ввод
 * @constructor
 */
function CalculatorView({
                            getCalculatorData,
                            mainTextInput
                        }: { getCalculatorData: () => Promise<CalculatorData>, mainTextInput: MainTextInput }) {
    const [views, setViews] = useState<React.ReactElement[]>([])
    const [calculators, setCalculators] = useState<ICalculatorBlock[]>([])
    const [viewNames, setViewNames] = useState<string[]>([])

    useEffect(() => {
        getCalculatorData().then((cd) => {
            setCalculators(cd.calculators);
            setViews(cd.views);
            setViewNames(["Текст", ...cd.calculators.map((e) => e.name)])
        }).catch((e) => alert(e))
    }, [getCalculatorData])

    return views.length > 0 ? (
        <ErrorBoundary FallbackComponent={ErrorHandler}>
            <Container>
                {views.map((value, index) => (
                    <Box key={index}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1,
                            my: 2
                        }}>
                            <Avatar sx={{bgcolor: blue[900]}}>{index + 1}</Avatar>
                            <Typography variant="h6">
                                {viewNames[index]}
                            </Typography>
                            <Divider sx={{flex: 1}}></Divider>
                        </Box>
                        <Paper sx={{p: 2}} square>
                            {value}
                        </Paper>
                    </Box>
                ))}
                <PriceViewObservable calculators={calculators} mainTextInput={mainTextInput}></PriceViewObservable>
            </Container>
        </ErrorBoundary>
    ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh" flexDirection="column" gap={1}>
            <CircularProgress color="secondary"/>
            <Typography align="center">
                Загрузка...
            </Typography>
        </Box>
    );
}

export default CalculatorView;
