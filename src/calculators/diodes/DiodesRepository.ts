import DiodeType from "./DiodeType";
import DiodesPowerSupply from "./DiodesPowerSupply";
import ExcelJS from "exceljs";

const DIODES_WORKSHEET_NAME = "Светодиоды";

let diodes : DiodeType[] | null = null;

/**
 * Получает виды диодов с их стоимостью.
 */
export async function getDiodes (pricesWorkbook: ExcelJS.Workbook) : Promise<DiodeType[]>{
    if (diodes == null){
        const sheet = pricesWorkbook.getWorksheet(DIODES_WORKSHEET_NAME);
        const result:DiodeType[] = [];
        for (let c = 1; c<= sheet.actualColumnCount; c++){
            result.push(new DiodeType(
                Number(sheet.getCell(2,c).text),
                Number(sheet.getCell(3,c).text)
            ))
        } 
        diodes = result;
    }
    
    return diodes;
}

/**
 * Получает виды блоков питания.
 */
export async function getPowerSupplies() : Promise<DiodesPowerSupply[]>{
    return [
        new DiodesPowerSupply("Блок питания 1", 100),
        new DiodesPowerSupply("Блок питания 2", 200)
    ]
}