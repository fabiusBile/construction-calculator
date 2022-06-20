/**
 * Применение диодов.
 */
export default class DiodesApplication {
    /**
     * Минимальный размер буквы.
     */
    minLetterSize: number;

    /**
     * Максимальный размер диодов.
     */
    maxLetterSize: number;

    /**
     * Соотношение типа диода и необходимого количества.
     */
    allowedDiodesTypes: Record<number, number>;

    constructor(minLetterSize: number, maxLetterSize: number, allowedDiodesTypes: Record<number, number>) {
        this.minLetterSize = minLetterSize;
        this.maxLetterSize = maxLetterSize;
        this.allowedDiodesTypes = allowedDiodesTypes;
    }
}