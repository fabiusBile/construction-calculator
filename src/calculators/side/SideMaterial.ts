/**
 * Материал торца буквы.
 */
export default class SideMaterial {
    name: string;
    price: number;
    type: SideMaterialType;

    constructor(name: string, price: number,  type: SideMaterialType) {
        this.name = name;
        this.price = price;
        this.type = type;
    }
}

export type SideMaterialType = "plate" | "strip"