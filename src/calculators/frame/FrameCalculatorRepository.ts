import FrameMaterial from "./FrameMaterial";
import ExcelJS from "exceljs";

let frameMaterials: FrameMaterial[] | null;

export default function GetFrameMaterials(sheet: ExcelJS.Worksheet): FrameMaterial[] {
    if (frameMaterials == null) {
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

        frameMaterials = result;
    }

    return frameMaterials;
}