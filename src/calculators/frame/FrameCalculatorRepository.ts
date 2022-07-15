import FrameMaterial from "./FrameMaterial";
import ExcelJS from "exceljs";
import memoizeSpreadsheetData from "../../shared/memoizeSpreadsheetData";

function getFrameMaterialsBase(sheet: ExcelJS.Worksheet): FrameMaterial[] {
        const result: FrameMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name) {
                continue;
            }
            result.push(new FrameMaterial(
                name,
                Number(sheet.getCell(r, 2).text) / 10000,
                sheet.getCell(r, 3).text === "Труба" ? "pipe" : "plate"
            ))
        }
        
        return result;
}

/**
 * Получает материалы лицевой части.
 */
export const getFrameMaterials = memoizeSpreadsheetData(getFrameMaterialsBase);