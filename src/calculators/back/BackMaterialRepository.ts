import BackMaterial from "./BackMaterial";
import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";

function getBackMaterialsBase(sheet: ExcelJS.Worksheet): BackMaterial[] {
        const result: BackMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name) {
                continue;
            }
            result.push(new BackMaterial(
                name,
                Number(sheet.getCell(r, 2).text) / 10000
            ))
        }
    return result;
}

/**
 * Получает материалы задника.
 */
export const getBackMaterials = memoizeSpreadsheetData(getBackMaterialsBase);