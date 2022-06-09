/**
 * Материал торца буквы.
 */
export default class BackMaterial {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}