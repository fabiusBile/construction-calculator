import BackMaterial from "./BackMaterial";
import ExcelJS from "exceljs";

let backMaterials : BackMaterial[] | null = null;

const BACK_MATERIALS_WORKSHEET_NAME = "Задник";

export default function getBackMaterials (pricesWorkbook: ExcelJS.Workbook) : BackMaterial[] {
    if (backMaterials == null) {
        console.log("new materials loaded")
        const sheet = pricesWorkbook.getWorksheet(BACK_MATERIALS_WORKSHEET_NAME);
        const result: BackMaterial[] = [];
        for (let r = 1; r <= sheet.rowCount; r++) {
            const name = sheet.getCell(r, 1).text;
            if (!name){
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