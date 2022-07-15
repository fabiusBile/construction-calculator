import DiodeType from "./DiodeType";
import DiodesPowerSupply from "./DiodesPowerSupply";
import ExcelJS from "exceljs";

let diodes: DiodeType[] | null = null;
let powerSupplies: DiodesPowerSupply[] | null = null;

/**
 * Получает виды диодов с их стоимостью.
 */
export function getDiodes(sheet: ExcelJS.Worksheet): DiodeType[] {
    if (diodes == null) {
        const result: DiodeType[] = [];
        for (let c = 1; c <= sheet.actualColumnCount; c++) {
            result.push(new DiodeType(
                Number(sheet.getCell(2, c).text),
                Number(sheet.getCell(3, c).text)
            ))
        }
        diodes = result;
    }

    return diodes;
}

/**
 * Получает виды блоков питания.
 */
export function getPowerSupplies(sheet: ExcelJS.Worksheet): DiodesPowerSupply[] {
    if (powerSupplies == null) {
        const result: DiodesPowerSupply[] = [];
        for (let r = 1; r <= sheet.actualRowCount; r++) {
            result.push(new DiodesPowerSupply(
                sheet.getCell(r, 1).text,
                Number(sheet.getCell(r, 2).text)
            ))
        }
        powerSupplies = result;
    }

    return powerSupplies;
}