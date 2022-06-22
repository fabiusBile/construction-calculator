import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import FrameMaterial from "./FrameMaterial";
import {action, computed, makeObservable, observable} from "mobx";

/**
 * Калькулятор каркаса.
 */
export default class FrameCalculator implements ICalculatorBlock {

    /**
     * Материалы каркаса.
     */
    materials: FrameMaterial[];
    
    currentMaterialId: number;
    /**
     * Ширина каркаса.
     */
    width: number = 0;
    /**
     * Высота каркаса.
     */
    height: number = 0;
    /**
     * Название блока.
     */
    name: string = "Каркас";

    /**
     * Конструктор по умолчанию.
     * @param materials Материалы каркаса.
     */
    constructor(materials: FrameMaterial[]) {
        this.materials = materials;
        this.currentMaterialId = 0;
        makeObservable(this, {
            width: observable,
            height: observable,
            currentMaterial: computed,
            currentMaterialId: observable,
            setCurrentMaterial: action,
            setHeight: action,
            setWidth: action
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

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    /**
     * Рассчитывает цену каркаса.
     */
    getPrice(): BlockPrice {
        switch (this.currentMaterial.materialType) {
            case "pipe":
                return getPipePrice(this.currentMaterial, this);
            case "plate":
                return getPlatePrice(this.currentMaterial, this);
        }
    }
}


function getPlatePrice(fm: FrameMaterial, c: FrameCalculator) {
    const price = fm.price * c.height * c.width;
    return {
        price: price,
        details: {
            [`${fm.name} ${c.width}x${c.height} см.`]: price
        }
    }
}

function getPipePrice(fm: FrameMaterial, c: FrameCalculator) {
    const horizontalPrice = (fm.price * c.width) * 2
    const verticalPrice = (fm.price * c.height) * 2;
    const details = horizontalPrice === verticalPrice
        ? {[`${fm.name} ${c.width} см. х4`]: horizontalPrice * 2}
        : {
            [`${fm.name} ${c.width} см. х2`]: horizontalPrice,
            [`${fm.name} ${c.height} см. х2`]: verticalPrice,
        }
    return {
        price: horizontalPrice + verticalPrice,
        details: details
    }
}
