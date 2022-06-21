import LettersDimensionsForSize from "./LettersDimensionsForSize";
import ExcelJS from "exceljs";
import {letter, toLetter} from "./Letter";
import LetterDimensions from "./LetterDimensions";

let letterDimensionsForSize: LettersDimensionsForSize[] | null = null;
const LETTERS_WORKSHEET_NAME = "Буквы";
const lettersTitleRegex = /^БУКВЫ (?<min>\d+)-(?<max>\d+)СМ$/gi

/**
 * Возвращает размеры букв.
 */
export default function getLettersDimensions(pricesWorkbook: ExcelJS.Workbook): LettersDimensionsForSize[] {
    if (letterDimensionsForSize == null) {
        const sheet = pricesWorkbook.getWorksheet(LETTERS_WORKSHEET_NAME);
        const firstColumn = sheet.getColumn(1);
        const result: LettersDimensionsForSize[] = [];
        firstColumn.eachCell((cell, row) => {
            const regexMatch = lettersTitleRegex.exec(cell.text);
            if (regexMatch) {
                result.push(getLetterDimensionsFromSheet(Number(regexMatch.groups!.min),
                    Number(regexMatch.groups!.max),
                    row,
                    sheet))
            }
        })

        letterDimensionsForSize = result;
    }
    return letterDimensionsForSize;
}

function getLetterDimensionsFromSheet(min: number, max: number, rowNumber: number, sheet: ExcelJS.Worksheet): LettersDimensionsForSize {
    const lettersDimensions: Partial<Record<letter, LetterDimensions>> = {};
    for (let c = 2; c <= sheet.actualColumnCount; c++) {
        const letter = toLetter(sheet.getCell(rowNumber, c).text);
        lettersDimensions[letter] = {
            height: Number(sheet.getCell(rowNumber + 1, c).text),
            width: Number(sheet.getCell(rowNumber + 2, c).text),
            depth: Number(sheet.getCell(rowNumber + 3, c).text),
            line: Number(sheet.getCell(rowNumber + 4, c).text),
        };
    }

    return {
        minSize: min,
        maxSize: max,
        lettersDimensions: lettersDimensions
    }
}



