/**
 * Размеры букв при указанном размере шрифта.
 */
import {letter} from "./Letter";
import LetterDimensions from "./LetterDimensions";

export default interface LettersDimensionsForSize {

    /**
     * Минимальный размер шрифта.
     * @type {number}
     */
    minSize: number;

    /**
     * Максимальный размер шрифта.
     * @type {number}
     */
    maxSize: number;

    /**
     * Список размеров букв.
     * @type {Record<letter, LetterDimensions>}
     */
    lettersDimensions: Record<letter, LetterDimensions>;
}