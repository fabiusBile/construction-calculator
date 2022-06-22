import SideMaterial from "./SideMaterial";
import ExcelJS from "exceljs";

const SIDE_MATERIALS_WORKSHEET_NAME = "Торец"
let sideMaterials: SideMaterial[] | null = null;

/**
 * Получает материалы торца буквы.
 */
export default async function getSideMaterials(pricesWorkbook: ExcelJS.Workbook) : Promise<SideMaterial[]> {
    if (sideMaterials == null) {
        const sheet = pricesWorkbook.getWorksheet(SIDE_MATERIALS_WORKSHEET_NAME);
        const result: SideMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name) {
                continue;
            }
            result.push(new SideMaterial(
                name,
                Number(sheet.getCell(r, 2).text) / 10000
            ))
        }
        sideMaterials = result;
    }
    return sideMaterials;
}