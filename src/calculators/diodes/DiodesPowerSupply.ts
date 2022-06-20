/**
 * Блок питания светодиодов.
 */
export default class DiodesPowerSupply {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}