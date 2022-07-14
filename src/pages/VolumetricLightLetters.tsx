import React from 'react';
import ICalculatorBlock from "../calculators/interfaces/ICalculatorBlock";
import FrameCalculator from "../calculators/frame/FrameCalculator";
import FrameCalculatorView from "../calculators/frame/FrameCalculatorView";
import GetFrameMaterials from "../calculators/frame/FrameCalculatorRepository";
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
import MainTextInputView from "../shared/mainTextInput/MainTextInputView";
import LettersDimensionsCalculator from "../shared/letters/LettersDimensionsCalculator";
import getLettersDimensions from "../shared/letters/LettersRepository";
import {observable} from "mobx";
import BackCalculator from "../calculators/back/BackCalculator";
import getBackMaterials from "../calculators/back/BackMaterialRepository";
import BackCalculatorView from "../calculators/back/BackCalculatorView";
import getFrontMaterials from "../calculators/front/FrontMaterialRepository";
import FrontCalculator from "../calculators/front/FrontCalculator";
import FrontCalculatorView from "../calculators/front/FrontCalculatorView";
import getSideMaterials from "../calculators/side/SideMateriialRepository";
import SideCalculator from "../calculators/side/SideCalculator";
import SideCalculatorView from "../calculators/side/SideCalculatorView";
import {getDiodes, getPowerSupplies} from "../calculators/diodes/DiodesRepository";
import DiodesCalculator from "../calculators/diodes/DiodesCalculator";
import DiodesCalculatorView from "../calculators/diodes/DiodesCalculatorView";
import loadPrices from "../spreadsheetsInteraction/worksheetsLoader";
import ceilTo2Decimals from "../shared/ceilTo2Decimals";

const rouble = "₽";

const views: React.ReactElement[] = observable([]);
const calculators: ICalculatorBlock[] = observable([])
const mainTextInput = new MainTextInput();
const viewNames: string[] = observable([]);

(async () => {
    const pricesWorkbook = await loadPrices();
    const letterDimensions = getLettersDimensions(pricesWorkbook);
    const lettersCalculator = new LettersDimensionsCalculator(letterDimensions)

    const frameCalculator = new FrameCalculator(GetFrameMaterials(pricesWorkbook))
    const backMaterials = getBackMaterials(pricesWorkbook);
    const backCalculator = new BackCalculator(backMaterials, mainTextInput, lettersCalculator);

    const frontMaterials = getFrontMaterials(pricesWorkbook);
    const frontCalculator = new FrontCalculator(frontMaterials, mainTextInput, lettersCalculator);

    const sideMaterials = await getSideMaterials(pricesWorkbook);
    const sideCalculator = new SideCalculator(sideMaterials, mainTextInput, lettersCalculator);

    const diodesTypes = getDiodes(pricesWorkbook);
    const powerSupplies = getPowerSupplies(pricesWorkbook);
    const diodesCalculator = new DiodesCalculator(diodesTypes, powerSupplies);

    calculators.push(frameCalculator, backCalculator, frontCalculator, sideCalculator, diodesCalculator);
    views.push(
        <MainTextInputView mainTextInput={mainTextInput}/>,
        <FrameCalculatorView calculator={frameCalculator}/>,
        <BackCalculatorView calculator={backCalculator}/>,
        <FrontCalculatorView calculator={frontCalculator}/>,
        <SideCalculatorView calculator={sideCalculator}/>,
        <DiodesCalculatorView calculator={diodesCalculator}/>
    );

    viewNames.push(
        "Текст",
        ...calculators.map((e) => e.name)
    )
})();

function priceView({calculators}: { calculators: ICalculatorBlock[] }) {
    const total = ceilTo2Decimals(calculators.reduce((p, c) => p + (c.getPrice()).price, 0));
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
                            const price = c.getPrice();
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
 * Объемные световые буквы.
 * @constructor
 */
function VolumetricLightLetters() {
    return views.length > 0 ? (
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
            <PriceViewObservable calculators={calculators}></PriceViewObservable>
        </Container>
    ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100vh" flexDirection="column" gap={1}>
            <CircularProgress color="secondary"/>
            <Typography align="center">
                Загрузка...
            </Typography>
        </Box>
    );
}

export default observer(VolumetricLightLetters);
