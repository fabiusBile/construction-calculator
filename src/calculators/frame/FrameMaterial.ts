export default class FrameMaterial<T extends FrameMaterialType> {
    name: string;
    price: number;
    materialType: T;
    
    constructor(name: string, price: number, materialType: T) {
        this.name = name;
        this.price = price;
        this.materialType = materialType;
    }
}


export type FrameMaterialType = "pipe" | "plate";