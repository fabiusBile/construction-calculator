import SideMaterial from "./SideMaterial";

/**
 * Получает материалы торца буквы.
 */
export default async function getSideMaterials() : Promise<SideMaterial[]> {
    return [
        new SideMaterial("Материал торца 1", 100),
        new SideMaterial("Материал торца 2", 200),
        new SideMaterial("Материал торца 3", 300),
    ]
}