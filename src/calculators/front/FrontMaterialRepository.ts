import FrontMaterial from "./FrontMaterial";
import ExcelJS from "exceljs";

let frontMaterials: FrontMaterial[] | null = null;

/**
 * Получает материалы лицевой части.
 */
export default function getFrontMaterials(sheet: ExcelJS.Worksheet): FrontMaterial[] {
    if (frontMaterials == null) {
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
        frontMaterials = result;
    }
    return frontMaterials;
}