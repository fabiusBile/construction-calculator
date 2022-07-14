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

const mainTextInput = new MainTextInput();

async function getCalculatorData(): Promise<CalculatorData> {
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
 * Объемные световые буквы.
 * @constructor
 */
export default function VolumetricLightLetters() {
    return <CalculatorView getCalculatorData={getCalculatorData}/>
}
