import LettersDimensionsForSize from "./LettersDimensionsForSize";

let letterDimensionsForSize: LettersDimensionsForSize[] | null = null;

/**
 * Возвращает размеры букв.
 */
export default async function getLettersDimensions(): Promise<LettersDimensionsForSize[]> {
    if (letterDimensionsForSize == null) {
        letterDimensionsForSize = [
            {
                minSize: 0,
                maxSize: 20,
                lettersDimensions: {
                    a: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    l: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    k: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    а: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    п: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    d: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    c: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    b: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    m: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    e: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    f: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    g: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    h: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    i: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    j: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    n: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    o: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    p: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    q: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    r: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    s: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    t: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    u: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    v: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    w: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    y: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    z: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    в: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    г: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    д: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    е: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ж: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    з: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    и: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    й: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    к: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    л: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    м: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    н: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    о: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    р: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    с: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    т: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    у: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ф: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    б: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    х: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ц: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ч: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ш: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    щ: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ъ: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ь: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ы: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ё: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    я: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    ю: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    э: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    },
                    x: {
                        depth: 1,
                        height: 2,
                        width: 3,
                        line: 10
                    }
                }
            }
        ];
    }
    return letterDimensionsForSize;
}




