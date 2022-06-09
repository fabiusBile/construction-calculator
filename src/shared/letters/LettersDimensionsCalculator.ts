import LettersDimensionsForSize from "./LettersDimensionsForSize";
import LetterDimensions from "./LetterDimensions";
import {isValidLetter, letter} from "./Letter";

export default class LettersDimensionsCalculator {
    dimensionsForSizes: LettersDimensionsForSize[];

    private defaultLetter: letter = 'о';
    
    constructor(dimensionsForSizes: LettersDimensionsForSize[]) {
        this.dimensionsForSizes = dimensionsForSizes;
    }
    
    /**
     * Возвращает размеры букв текста указанного размера шрифта.
     * @param fontSize Размер шрифта.
     * @param text Текст.
     */
    getDimensionsForText(fontSize: number, text: string) : LetterDimensions[] {
        const lettersArray = text.split("");
        const dimensionGroup = this.dimensionsForSizes.find(e => e.maxSize >= fontSize && e.minSize <= fontSize);
        
        if (dimensionGroup === undefined){
            return [];
        }
        
        return  lettersArray.map(l => {
            const lower = l.toLowerCase();
            const letter = isValidLetter(lower) ? lower as letter : this.defaultLetter;
            return dimensionGroup.lettersDimensions[letter]
        })
    }
}