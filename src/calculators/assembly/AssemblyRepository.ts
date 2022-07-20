import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";

function getAssemblyPriceBase(sheet: ExcelJS.Worksheet) : number{
    return Number(sheet.getCell(1, 2).text)
}

/**
 * Получает стоимость сборки.
 */
export const getAssemblyPrice = memoizeSpreadsheetData(getAssemblyPriceBase);