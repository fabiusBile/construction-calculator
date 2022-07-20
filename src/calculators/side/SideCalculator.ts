import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import SideMaterial from "./SideMaterial";
import {action, computed, makeObservable, observable} from "mobx";
import {MainTextInput} from "../../shared/mainTextInput/MainTextInput";
import LettersDimensionsCalculator from "../../shared/letters/LettersDimensionsCalculator";
import ceilTo2Decimals from "../../shared/ceilTo2Decimals";

const sideMaterialPlateStep = 200;
const sideMaterialStripStep = 100;

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
        switch (this.currentMaterial.type){
            case "plate":
                return this.getPlatePrice();
            case "strip":
                return this.getStripPrice();
        }
    }

    private getPlatePrice(){
        const letterSizes = this.letterDimensionsCalculator
            .getDimensionsForText(this.mainTextInput.fontSize, this.mainTextInput.text);

        let largestLetterDepth = Math.max.apply(null, letterSizes.map(e => e.depth));
        largestLetterDepth = isFinite(largestLetterDepth) ? largestLetterDepth : 0;
        const lineWithStep = Math.ceil(this.mainTextInput.line / sideMaterialPlateStep) * sideMaterialPlateStep;
        const size = largestLetterDepth * lineWithStep;
        const price = ceilTo2Decimals(size * this.currentMaterial.price);
        return {
            price: price,
            details: {
                [`${this.currentMaterial.name} ${lineWithStep}x${largestLetterDepth} см.`]: price
            }
        };
    } 
    
    private getStripPrice(){
        const lineWithStep = Math.ceil(this.mainTextInput.line / sideMaterialStripStep) * sideMaterialStripStep;
        const price = ceilTo2Decimals(lineWithStep * this.currentMaterial.price);
        return{
            price: price,
            details: {
                [`${this.currentMaterial.name} ${lineWithStep}см.`]: price
            }
        }
    }
    
    /**
     * Выбирает материал.
     * @param materialIndex Индекс материала.
     */
    setCurrentMaterial(materialIndex: number) {
        this.currentMaterialId = materialIndex;
    }

}