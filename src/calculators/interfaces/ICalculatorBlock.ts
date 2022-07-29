/**
 * Интерфейс блока калькулятора
 */
export default interface ICalculatorBlock {
    /**
     * Название блока.
     */
    readonly name: string;

    /**
     * Рассчитывает стоимость материалов данного блока.
     */
    readonly price: BlockPrice;
}

/**
 * Стоимость блока калькулятора.
 */
export interface BlockPrice {
    /**
     * Стоимость блока.
     */
    price: number;

    /**
     * Детализация цены блока.
     */
    details: Record<string, number>
}