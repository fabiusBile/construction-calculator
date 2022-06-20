import ExcelJS from "exceljs"
const fs = require('fs-extra');
const PRICES_FILE_NAME = "spreadsheets/prices.xlsx" 
let workBook : ExcelJS.Workbook | null;


/**
 * Загружает файл с ценами.
 */
export default async function loadPrices() : Promise<ExcelJS.Workbook> {
    if (workBook == null){
        const stream = fs.createReadStream(PRICES_FILE_NAME)
        const _workBook = new ExcelJS.Workbook();
        await _workBook.xlsx.read(stream);
        workBook = _workBook;
    }
    return  workBook;
}

