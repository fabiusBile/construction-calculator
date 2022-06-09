import LetterDimensions from "./LetterDimensions";

/**
 * Рассчитывает размер прямоугольника из букв.
 * @param lettersDimensions Размеры букв.
 */
export default function getLettersRectangle(lettersDimensions: LetterDimensions[]) : number{
    return lettersDimensions.reduce((v, c) => v + c.width*c.height,0);
}