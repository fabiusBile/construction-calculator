import FrameMaterial, {FrameMaterialType} from "./FrameMaterial";

export default function GetFrameMaterials() : FrameMaterial<FrameMaterialType>[]{
    return [
        new FrameMaterial("Тестовый лист 1", 100, "plate"),
        new FrameMaterial("Тестовый лист 2", 200, "plate"),
        new FrameMaterial("Тестовая труба 1", 300, "pipe"),
        new FrameMaterial("Тестовая труба 2", 400, "pipe"),
    ]
}