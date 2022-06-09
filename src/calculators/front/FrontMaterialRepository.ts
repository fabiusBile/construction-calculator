import FrontMaterial from "./FrontMaterial";

export default async function getFrontMaterials () : Promise<FrontMaterial[]> {
    return Promise.resolve(
        [
            new FrontMaterial("Материал лицевой части 1", 100),
            new FrontMaterial("Материал лицевой части 2", 200),
            new FrontMaterial("Материал лицевой части 3", 300),
        ]
    )
}