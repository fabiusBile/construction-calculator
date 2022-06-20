import DiodeType from "./DiodeType";
import DiodesPowerSupply from "./DiodesPowerSupply";

/**
 * Получает виды диодов с их стоимостью.
 */
export async function getDiodes () : Promise<DiodeType[]>{
    return [
        new DiodeType(0.3, 20),
        new DiodeType(0.36, 23),
        new DiodeType(0.72, 28),
        new DiodeType(1.1, 39),
        new DiodeType(1.5, 42)
    ]
}

/**
 * Получает виды блоков питания.
 */
export async function getPowerSupplies() : Promise<DiodesPowerSupply[]>{
    return [
        new DiodesPowerSupply("Блок питания 1", 100),
        new DiodesPowerSupply("Блок питания 2", 200)
    ]
}