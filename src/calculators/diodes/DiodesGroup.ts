import DiodeType from "./DiodeType";
import {action, makeObservable, observable} from "mobx";

export default class DiodesGroup {
    diodeType: DiodeType;
    count: number;
    currentDiodeTypeId: number;

    constructor(diodeType: DiodeType, currentDiodeTypeId: number) {
        this.diodeType = diodeType;
        this.count = 1;
        this.currentDiodeTypeId = currentDiodeTypeId;

        makeObservable(this, {
            diodeType: observable,
            count: observable,
            currentDiodeTypeId: observable,
            setDiodeType: action,
            setCount: action
        })
    }

    setDiodeType(diodeType: DiodeType, diodeTypeId: number) {
        this.diodeType = diodeType;
        this.currentDiodeTypeId = diodeTypeId;
    }

    setCount(count: number) {
        if (count >= 0) {
            this.count = count;
        }
    }
}