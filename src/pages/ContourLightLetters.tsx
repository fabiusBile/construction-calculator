import React from 'react';
import FrameCalculator from "../calculators/frame/FrameCalculator";
import FrameCalculatorView from "../calculators/frame/FrameCalculatorView";
import {MainTextInput} from "../shared/mainTextInput/MainTextInput";
import MainTextInputView from "../shared/mainTextInput/MainTextInputView";
import LettersDimensionsCalculator from "../shared/letters/LettersDimensionsCalculator";
import BackCalculator from "../calculators/back/BackCalculator";
import BackCalculatorView from "../calculators/back/BackCalculatorView";
import FrontCalculator from "../calculators/front/FrontCalculator";
import FrontCalculatorView from "../calculators/front/FrontCalculatorView";
import SideCalculator from "../calculators/side/SideCalculator";
import SideCalculatorView from "../calculators/side/SideCalculatorView";
import DiodesCalculator from "../calculators/diodes/DiodesCalculator";
import DiodesCalculatorView from "../calculators/diodes/DiodesCalculatorView";
import loadPrices from "../spreadsheetsInteraction/worksheetsLoader";
import CalculatorView, {CalculatorData} from "./CalculatorPage";
import {sheetNames} from "../spreadsheetsInteraction/sheetNames";
import {getBackMaterials} from "../calculators/back/BackMaterialRepository";
import {getDiodes, getPowerSupplies} from "../calculators/diodes/DiodesRepository";
import {getFrameMaterials} from "../calculators/frame/FrameCalculatorRepository";
import {getSideMaterials} from "../calculators/side/SideMateriialRepository";
import {getLettersDimensions} from "../shared/letters/LettersRepository";
import {getFrontMaterials} from "../calculators/front/FrontMaterialRepository";
import {getAssemblyPrice} from "../calculators/assembly/AssemblyRepository";
import AssemblyCalculator from "../calculators/assembly/AssemblyCalculator";

const mainTextInput = new MainTextInput();

async function getCalculatorData(): Promise<CalculatorData> {
    const pricesWorkbook = await loadPrices();
    const letterDimensions = getLettersDimensions(pricesWorkbook.getWorksheet(sheetNames.LETTERS_WORKSHEET_NAME));
    const lettersCalculator = new LettersDimensionsCalculator(letterDimensions)
    
    const frameCalculator = new FrameCalculator(
        getFrameMaterials(
            pricesWorkbook.getWorksheet(sheetNames.FRAME_MATERIALS_WORKSHEET_NAME)))

    const backMaterials = getBackMaterials(pricesWorkbook.getWorksheet(sheetNames.FRONT_MATERIALS_WORKSHEET_NAME));
    const backCalculator = new BackCalculator(backMaterials, mainTextInput, lettersCalculator);
    const frontMaterials = getFrontMaterials(pricesWorkbook.getWorksheet(sheetNames.FRONT_MATERIALS_WORKSHEET_NAME));
    const frontCalculator = new FrontCalculator(frontMaterials, mainTextInput, lettersCalculator);

    const sideMaterials = getSideMaterials(pricesWorkbook.getWorksheet(sheetNames.SIDE_MATERIALS_WORKSHEET_NAME));
    const sideCalculator = new SideCalculator(sideMaterials, mainTextInput, lettersCalculator);

    const diodesTypes = getDiodes(pricesWorkbook.getWorksheet(sheetNames.DIODES_WORKSHEET_NAME));
    const powerSupplies = getPowerSupplies(pricesWorkbook.getWorksheet(sheetNames.POWER_SUPPLIES_WORKSHEET_NAME));
    const diodesCalculator = new DiodesCalculator(diodesTypes, powerSupplies);
    const assemblyPrice = getAssemblyPrice(pricesWorkbook.getWorksheet(sheetNames.ASSEMBLY_WORKSHEET_NAME));
    const assemblyCalculator = new AssemblyCalculator(assemblyPrice, mainTextInput, lettersCalculator);
    
    return {
        calculators: [frameCalculator, backCalculator, frontCalculator, sideCalculator, diodesCalculator, assemblyCalculator],
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