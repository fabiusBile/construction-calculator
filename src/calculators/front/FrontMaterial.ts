/**
 * Материал лицевой части буквы.
 */
export default class FrontMaterial {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}