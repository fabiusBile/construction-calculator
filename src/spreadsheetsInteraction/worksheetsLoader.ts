import ExcelJS from "exceljs"
let workBook : ExcelJS.Workbook | null;

/**
 * Загружает файл с ценами.
 */
export default function loadPrices() : Promise<ExcelJS.Workbook> {
    if (workBook == null){
        return new Promise<ExcelJS.Workbook>(async (resolve, reject) => {
            window.api.send("requestPrices");
            window.api.receive("receivePrices", async (data : ExcelJS.Buffer) => {
                const _workBook = new ExcelJS.Workbook();
                await _workBook.xlsx.load(data);
                workBook = _workBook;
                resolve(workBook);
            });
            setTimeout(() => reject("Файл с ценами не загружен"), 10000);
        });
    }
    return  Promise.resolve(workBook);
}

