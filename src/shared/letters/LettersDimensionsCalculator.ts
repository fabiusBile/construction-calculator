import LettersDimensionsForSize from "./LettersDimensionsForSize";
import LetterDimensions from "./LetterDimensions";
import {toLetter} from "./Letter";

export default class LettersDimensionsCalculator {
    dimensionsForSizes: LettersDimensionsForSize[];
    
    constructor(dimensionsForSizes: LettersDimensionsForSize[]) {
        this.dimensionsForSizes = dimensionsForSizes;
    }

    /**
     * Возвращает размеры букв текста указанного размера шрифта.
     * @param fontSize Размер шрифта.
     * @param text Текст.
     */
    getDimensionsForText(fontSize: number, text: string): LetterDimensions[] {
        const lettersArray = text.split("");
        const dimensionGroup = this.dimensionsForSizes.find(e => e.maxSize >= fontSize && e.minSize <= fontSize);

        if (dimensionGroup === undefined) {
            return [];
        }

        return lettersArray.filter(l => l !== " ").map(l => {
            const letter = toLetter(l);
            const dimensions = dimensionGroup.lettersDimensions[letter];
            if (dimensions === undefined) {
                throw new Error(`Не найдены размеры для буквы ${letter}`)
            }
            return dimensions;
        })
    }
}