import BackMaterial from "./BackMaterial";
import ExcelJS from "exceljs";

let backMaterials: BackMaterial[] | null = null;

/**
 * Получает материалы задника.
 */
export default function getBackMaterials(sheet: ExcelJS.Worksheet): BackMaterial[] {
    if (backMaterials == null) {
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
        backMaterials = result;
    }
    return backMaterials;
}