import FrontMaterial from "./FrontMaterial";
import ExcelJS from "exceljs";

const FRONT_MATERIALS_WORKSHEET_NAME = "Лицевая часть"
let frontMaterials: FrontMaterial[] | null = null;

/**
 * Получает материалы лицевой части.
 * @param pricesWorkbook Эксель-документ с ценами.
 */
export default function getFrontMaterials(pricesWorkbook: ExcelJS.Workbook): FrontMaterial[] {
    if (frontMaterials == null) {
        const sheet = pricesWorkbook.getWorksheet(FRONT_MATERIALS_WORKSHEET_NAME);
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