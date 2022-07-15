import FrontMaterial from "./FrontMaterial";
import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";

function getFrontMaterialsBase(sheet: ExcelJS.Worksheet): FrontMaterial[] {
        const result: FrontMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name) {
                continue;
            }
            result.push(new FrontMaterial(
                name,
                Number(sheet.getCell(r, 2).text) / 10000
            ))
        }
        return  result;
}

/**
 * Получает материалы лицевой части.
 */
export const getFrontMaterials = memoizeSpreadsheetData(getFrontMaterialsBase);