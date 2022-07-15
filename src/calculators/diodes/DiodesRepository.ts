import DiodeType from "./DiodeType";
import DiodesPowerSupply from "./DiodesPowerSupply";
import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";


function getDiodesBase(sheet: ExcelJS.Worksheet): DiodeType[] {
    const result: DiodeType[] = [];
    for (let c = 1; c <= sheet.actualColumnCount; c++) {
        result.push(new DiodeType(
            Number(sheet.getCell(2, c).text),
            Number(sheet.getCell(3, c).text)
        ))
    }
    return result;
}

/**
 * Получает виды диодов с их стоимостью.
 */
export const getDiodes = memoizeSpreadsheetData(getDiodesBase);

function getPowerSuppliesBase(sheet: ExcelJS.Worksheet): DiodesPowerSupply[] {
    const result: DiodesPowerSupply[] = [];
    for (let r = 1; r <= sheet.actualRowCount; r++) {
        result.push(new DiodesPowerSupply(
            sheet.getCell(r, 1).text,
            Number(sheet.getCell(r, 2).text)
        ))
    }
    return result;
}

/**
 * Получает виды блоков питания.
 */
export const getPowerSupplies = memoizeSpreadsheetData(getPowerSuppliesBase);