/**
 * Тип светодиода.
 */
export default class DiodeType {

    /**
     * Потребляемая мощность.
     */
    power: number;

    /**
     * Цена.
     */
    price: number;

    constructor(power: number, price: number) {
        this.power = power;
        this.price = price;
    }
}