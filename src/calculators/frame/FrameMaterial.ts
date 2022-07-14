export default class FrameMaterial {
    name: string;
    price: number;
    materialType: FrameMaterialType;

    constructor(name: string, price: number, materialType: FrameMaterialType) {
        this.name = name;
        this.price = price;
        this.materialType = materialType;
    }
}


export type FrameMaterialType = "pipe" | "plate";