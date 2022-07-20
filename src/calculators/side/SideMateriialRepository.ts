import SideMaterial from "./SideMaterial";
import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";

function getSideMaterialsBase(sheet: ExcelJS.Worksheet): SideMaterial[] {
        const result: SideMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name) {
                continue;
            }
            const type = sheet.getCell(r, 3).text === "Лист" ? "plate" : "strip";
            result.push(new SideMaterial(
                name,
                Number(sheet.getCell(r, 2).text) / (type === "plate" ? 10000 : 1), 
                 type
            ))
        }
    return result;
}

/**
 * Получает материалы торца буквы.
 */
export const getSideMaterials = memoizeSpreadsheetData(getSideMaterialsBase)