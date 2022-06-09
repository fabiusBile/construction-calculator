import BackMaterial from "./BackMaterial";

export default async function getBackMaterials () : Promise<BackMaterial[]> {
    return Promise.resolve(
        [
            new BackMaterial("Материал задника 1", 100),
            new BackMaterial("Материал задника 2", 200),
            new BackMaterial("Материал задника 3", 300),
        ]
    )
}