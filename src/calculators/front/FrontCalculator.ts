import FrontMaterial from "./FrontMaterial";
import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import {MainTextInput} from "../../shared/mainTextInput/MainTextInput";
import LettersDimensionsCalculator from "../../shared/letters/LettersDimensionsCalculator";
import {action, computed, makeObservable, observable} from "mobx";
import getLettersRectangle from "../../shared/letters/LettersRectangleCalculator";
import {millingPrice} from "../../shared/constants/millingPrice";

/**
 * Калькулятор стоимости лицевой части буквы.
 */
export default class FrontCalculator implements ICalculatorBlock {
    materials: FrontMaterial[];
    currentMaterialId: number;
    readonly name = "Лицевая часть";
    private letterDimensionsCalculator: LettersDimensionsCalculator;
    private mainTextInput: MainTextInput;

    constructor(materials: FrontMaterial[], mainTextInput: MainTextInput, letterDimensionsCalculator: LettersDimensionsCalculator) {
        this.materials = materials;
        this.mainTextInput = mainTextInput;
        this.letterDimensionsCalculator = letterDimensionsCalculator;
        this.currentMaterialId = 0;

        makeObservable(this, {
            currentMaterial: computed,
            currentMaterialId: observable,
            setCurrentMaterial: action,
        })
    }

    /**
     * Выбранный материал.
     */
    get currentMaterial() {
        return this.materials[this.currentMaterialId]
    };

    /**
     * Выбирает материал.
     * @param materialIndex Индекс материала.
     */
    setCurrentMaterial(materialIndex: number) {
        this.currentMaterialId = materialIndex;
    }

    getPrice(): BlockPrice {
        const letterSizes = this.letterDimensionsCalculator.getDimensionsForText(this.mainTextInput.fontSize, this.mainTextInput.text);
        const size = getLettersRectangle(letterSizes);
        const materialPrice = size * this.currentMaterial.price;
        const totalMillingPrice = this.mainTextInput.line * millingPrice;
        return {
            price: materialPrice + totalMillingPrice,
            details: {
                [`${this.currentMaterial.name} ${size} см.^2`]: materialPrice,
                [`Фрезеровка ${this.mainTextInput.line} см.`]: totalMillingPrice
            }
        };
    }
}