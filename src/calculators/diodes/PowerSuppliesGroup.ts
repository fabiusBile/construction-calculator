import DiodesPowerSupply from "./DiodesPowerSupply";
import {action, makeObservable, observable} from "mobx";

export default class PowerSuppliesGroup {
    currentPowerSupply: DiodesPowerSupply;
    count: number;
    currentPowerSupplyId: number;


    constructor(powerSupply: DiodesPowerSupply, currentPowerSupplyId: number) {
        this.currentPowerSupply = powerSupply;
        this.count = 1;
        this.currentPowerSupplyId = currentPowerSupplyId;
        
        makeObservable(this, {
            currentPowerSupply: observable,
            count: observable,
            currentPowerSupplyId: observable,
            setCount: action,
            setPowerSupply: action
        })
    }
    
    setPowerSupply(powerSupply: DiodesPowerSupply, currentPowerSupplyId: number){
        this.currentPowerSupplyId = currentPowerSupplyId;
        this.currentPowerSupply = powerSupply;
    }
    
    setCount(count: number){
        if (count >= 0) {
            this.count = count;
        }
    }
}