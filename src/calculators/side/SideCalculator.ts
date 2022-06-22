import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import SideMaterial from "./SideMaterial";
import {action, computed, makeObservable, observable} from "mobx";
import {MainTextInput} from "../../shared/mainTextInput/MainTextInput";
import LettersDimensionsCalculator from "../../shared/letters/LettersDimensionsCalculator";

const sideMaterialStep = 200;

/**
 * Калькулятор торца букв.
 */
export default class SideCalculator implements ICalculatorBlock {

    materials: SideMaterial[];
    readonly name = "Торец";
    currentMaterialId: number;
    private mainTextInput: MainTextInput;
    private letterDimensionsCalculator: LettersDimensionsCalculator;
    
    
    constructor(materials: SideMaterial[], mainTextInput: MainTextInput, letterDimensionsCalculator: LettersDimensionsCalculator) {
        this.materials = materials;
        this.mainTextInput = mainTextInput;
        this.letterDimensionsCalculator = letterDimensionsCalculator;
        this.currentMaterialId = materials.findIndex(m => m.price > 0);
        
        makeObservable(this, {
            currentMaterial: computed,
            currentMaterialId: observable,
            setCurrentMaterial: action,
        })
    }

    /**
     * Выбранный материал.
     */
    get currentMaterial(): SideMaterial {
        return this.materials[this.currentMaterialId]
    };

    getPrice(): BlockPrice {
        const letterSizes = this.letterDimensionsCalculator
            .getDimensionsForText(this.mainTextInput.fontSize, this.mainTextInput.text);
        
        let largestLetterDepth = Math.max.apply(null, letterSizes.map(e => e.depth));
        largestLetterDepth = isFinite(largestLetterDepth) ? largestLetterDepth : 0;
        const lineWithStep = Math.ceil(this.mainTextInput.line / sideMaterialStep) * sideMaterialStep;
        const size = largestLetterDepth * lineWithStep;
        const price = size * this.currentMaterial.price;
        return {
            price: price,
            details: {
                [`${this.currentMaterial.name} ${lineWithStep}x${largestLetterDepth} см.`]: price
            }
        };
    }

    /**
     * Выбирает материал.
     * @param materialIndex Индекс материала.
     */
    setCurrentMaterial(materialIndex: number) {
        this.currentMaterialId = materialIndex;
    }

}