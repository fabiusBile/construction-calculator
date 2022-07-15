import React from 'react';
import FrameCalculator from "../calculators/frame/FrameCalculator";
import FrameCalculatorView from "../calculators/frame/FrameCalculatorView";
import GetFrameMaterials from "../calculators/frame/FrameCalculatorRepository";
import {MainTextInput} from "../shared/mainTextInput/MainTextInput";
import MainTextInputView from "../shared/mainTextInput/MainTextInputView";
import LettersDimensionsCalculator from "../shared/letters/LettersDimensionsCalculator";
import getLettersDimensions from "../shared/letters/LettersRepository";
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
import CalculatorView, {CalculatorData} from "./CalculatorPage";
import {sheetNames} from "../spreadsheetsInteraction/sheetNames";

const mainTextInput = new MainTextInput();

async function getCalculatorData(): Promise<CalculatorData> {
    const pricesWorkbook = await loadPrices();
    const letterDimensions = getLettersDimensions(pricesWorkbook);
    const lettersCalculator = new LettersDimensionsCalculator(letterDimensions)

    const frameCalculator = new FrameCalculator(
        GetFrameMaterials(
            pricesWorkbook.getWorksheet(sheetNames.FRAME_MATERIALS_WORKSHEET_NAME)))
    
    const backMaterials = getBackMaterials(pricesWorkbook.getWorksheet(sheetNames.BACK_MATERIALS_WORKSHEET_NAME));
    const backCalculator = new BackCalculator(backMaterials, mainTextInput, lettersCalculator);
    const frontMaterials = getFrontMaterials(pricesWorkbook.getWorksheet(sheetNames.BACK_MATERIALS_WORKSHEET_NAME));
    const frontCalculator = new FrontCalculator(frontMaterials, mainTextInput, lettersCalculator);

    const sideMaterials = await getSideMaterials(pricesWorkbook.getWorksheet(sheetNames.SIDE_MATERIALS_WORKSHEET_NAME));
    const sideCalculator = new SideCalculator(sideMaterials, mainTextInput, lettersCalculator);

    const diodesTypes = getDiodes(pricesWorkbook.getWorksheet(sheetNames.DIODES_WORKSHEET_NAME));
    const powerSupplies = getPowerSupplies(pricesWorkbook.getWorksheet(sheetNames.POWER_SUPPLIES_WORKSHEET_NAME));
    const diodesCalculator = new DiodesCalculator(diodesTypes, powerSupplies);

    return {
        calculators: [frameCalculator, backCalculator, frontCalculator, sideCalculator, diodesCalculator],
        views: [
            <MainTextInputView mainTextInput={mainTextInput}/>,
            <FrameCalculatorView calculator={frameCalculator}/>,
            <BackCalculatorView calculator={backCalculator}/>,
            <FrontCalculatorView calculator={frontCalculator}/>,
            <SideCalculatorView calculator={sideCalculator}/>,
            <DiodesCalculatorView calculator={diodesCalculator}/>
        ]
    }
}

/**
 * Световые буквы с контурной подсветкой.
 * @constructor
 */
export default function ContourLightLetters() {
    return <CalculatorView getCalculatorData={getCalculatorData}/>
}