import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import {MainTextInput} from "../../shared/mainTextInput/MainTextInput";
import LettersDimensionsCalculator from "../../shared/letters/LettersDimensionsCalculator";
import ceilTo2Decimals from "../../shared/ceilTo2Decimals";
import {computed, makeObservable} from "mobx";

/**
 * Калькулятор сборки.
 */
export default class AssemblyCalculator implements ICalculatorBlock{
    private readonly assemblyPrice: number;
    private readonly mainTextInput: MainTextInput;
    private readonly letterDimensionsCalculator: LettersDimensionsCalculator;

    constructor(assemblyPrice: number, mainTextInput: MainTextInput, letterDimensionsCalculator: LettersDimensionsCalculator) {
        this.assemblyPrice = assemblyPrice;
        this.mainTextInput = mainTextInput;
        this.letterDimensionsCalculator = letterDimensionsCalculator;
        
        makeObservable(this, {
            price: computed
        })
    }
    
    get price(): BlockPrice {
        const letterSizes = this.letterDimensionsCalculator.getDimensionsForText(this.mainTextInput.fontSize, this.mainTextInput.text);
        const price = ceilTo2Decimals(letterSizes.reduce((p,c) =>  p + c.height * this.assemblyPrice, 0));
        return {
            price: price,
            details:{
                [`Сборка ${letterSizes.length} букв`]:price
            }
        };
    }

    readonly name = "Сборка";
    
}