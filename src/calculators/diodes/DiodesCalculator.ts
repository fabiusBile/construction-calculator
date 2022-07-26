/**
 * Калькулятор количества и стоимости дидов.
 */
import DiodeType from "./DiodeType";
import {action, computed, makeObservable, observable} from "mobx";
import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import DiodesGroup from "./DiodesGroup";
import DiodesPowerSupply from "./DiodesPowerSupply";

/**
 * Калькулятор светодиодов.
 */
export default class DiodesCalculator implements ICalculatorBlock {
    diodeTypes: DiodeType[];
    diodesGroups: DiodesGroup[];
    readonly name = "Светодиоды";

    powerSupplies: DiodesPowerSupply[];
    currentPowerSupplyId: number;

    constructor(diodeTypes: DiodeType[], powerSupplies: DiodesPowerSupply[]) {

        this.diodeTypes = diodeTypes;
        this.diodesGroups = [];
        this.powerSupplies = powerSupplies;
        this.currentPowerSupplyId = 0;

        makeObservable(this, {
            diodesGroups: observable,
            currentPowerSupplyId: observable,
            addDiodesGroup: action,
            removeDiodesGroup: action,
            setPowerSupply: action,
            currentPowerSupply: computed
        })
    }

    /**
     * Выбранный блок питания.
     */
    get currentPowerSupply(): DiodesPowerSupply {
        return this.powerSupplies[this.currentPowerSupplyId]
    };

    removeDiodesGroup(index: number) {
        this.diodesGroups.splice(index, 1);
    }

    addDiodesGroup() {
        this.diodesGroups.push(new DiodesGroup(this.diodeTypes[0], 1))
    }

    /**
     * Выбирает блок питания.
     * @param powerSupplyId Индекс блока питания.
     */
    setPowerSupply(powerSupplyId: number) {
        this.currentPowerSupplyId = powerSupplyId;
    }

    getPrice(): BlockPrice {
        const totalDiodesPrices = this.diodesGroups.reduce((n, d) => n + d.count * d.diodeType.price, 0);
        const diodesPrices = Object.values(this.diodesGroups
            .reduce((g, e) => {
                    const {power, price} = e.diodeType;
                    return {
                        ...g,
                        [power]: {
                            "count": (g[power]?.count ?? 0) + e.count,
                            "price": (g[power]?.price ?? 0) + e.count * price,
                            "power": power
                        }
                    }
                }
                , {} as Record<"price" | "count" | "power", number>[]))
            .reduce((g, e) => ({
                ...g,
                [`${e.power} x ${e.count}`]: totalDiodesPrices
            }), {});
        return {
            price: totalDiodesPrices + this.currentPowerSupply.price,
            details: {
                [this.currentPowerSupply.name]: this.currentPowerSupply.price,
                ...diodesPrices
            }
        }
    }
}