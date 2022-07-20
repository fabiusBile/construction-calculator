import ExcelJS from "exceljs";

/**
 * Мемоизирует результат парсинг листа Excel.
 * @param func Функция парсинга.
 */
export default function memoizeSpreadsheetData<TResult> (func : (sheet : ExcelJS.Worksheet) => TResult){
    const results : Record<string, any> = {};
    return (sheet : ExcelJS.Worksheet) => {
        const argsKey = `${func.name}-${sheet.name}`;
        if (!results[argsKey]) {
            results[argsKey] = func(sheet);
        }
        return results[argsKey] as TResult;
    };
};