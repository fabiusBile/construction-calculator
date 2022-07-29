/**
 * Калькулятор количества и стоимости дидов.
 */
import DiodeType from "./DiodeType";
import {action, computed, makeObservable, observable} from "mobx";
import ICalculatorBlock, {BlockPrice} from "../interfaces/ICalculatorBlock";
import DiodesGroup from "./DiodesGroup";
import DiodesPowerSupply from "./DiodesPowerSupply";
import PowerSuppliesGroup from "./PowerSuppliesGroup";

/**
 * Калькулятор светодиодов.
 */
export default class DiodesCalculator implements ICalculatorBlock {
    diodeTypes: { index: number, value: DiodeType }[];
    diodesGroups: DiodesGroup[];
    readonly name = "Светодиоды";

    powerSupplies: { index: number; value: DiodesPowerSupply }[];
    powerSuppliesGroups: PowerSuppliesGroup[];

    constructor(diodeTypes: DiodeType[], powerSupplies: DiodesPowerSupply[]) {

        this.diodeTypes = diodeTypes.map((value, index) => ({index, value}));
        this.diodesGroups = [];
        this.powerSupplies = powerSupplies.map((value, index) => ({index, value}));
        this.powerSuppliesGroups = [];

        makeObservable(this, {
            diodesGroups: observable,
            powerSuppliesGroups: observable,
            addDiodesGroup: action,
            removeDiodesGroup: action,
            availableDiodes: computed,
            addPowerSuppliesGroup: action,
            removePowerSuppliesGroup: action,
            availablePowerSupplies: computed,
            price: computed
        })
    }

    get availableDiodes() {
        return this.diodeTypes.filter(e => this.diodesGroups.findIndex(ee => ee.currentDiodeTypeId === e.index) === -1);
    }

    get availablePowerSupplies() {
        return this.powerSupplies.filter(e => this.powerSuppliesGroups.findIndex(ee => ee.currentPowerSupplyId === e.index) === -1);
    }

    get price(): BlockPrice {
        const totalPowerSuppliesPrice = this.powerSuppliesGroups.reduce(
            (n, p) => n + p.count * p.currentPowerSupply.price, 0);
        const powerSuppliesPrices = this.powerSuppliesGroups.reduce((g,e) => ({
            ...g, 
            [`Блок питания ${e.currentPowerSupply.name} x ${e.count}`]: e.currentPowerSupply.price*e.count
        }), {})

        const totalDiodesPrices = this.diodesGroups.reduce(
            (n, d) => n + d.count * d.diodeType.price, 0);
        const diodesPrices = this.diodesGroups.reduce((g,e) => ({
            ...g,
            [`Светодиоды ${e.diodeType.power} x ${e.count}`]: e.diodeType.price*e.count
        }), {})
        
        return {
            price: totalDiodesPrices + totalPowerSuppliesPrice,
            details: {
                ...powerSuppliesPrices,
                ...diodesPrices
            }
        }
    }

    removeDiodesGroup(index: number) {
        this.diodesGroups.splice(index, 1);
    }

    addDiodesGroup() {
        const availableDiodes = this.availableDiodes;
        if (availableDiodes.length > 0) {
            const diode = availableDiodes[0];
            this.diodesGroups.push(new DiodesGroup(diode.value, diode.index))
        }
    }

    addPowerSuppliesGroup() {
        const availablePowerSupplies = this.availablePowerSupplies;
        if (availablePowerSupplies.length > 0) {
            const ps = availablePowerSupplies[0];
            this.powerSuppliesGroups.push(new PowerSuppliesGroup(ps.value, ps.index))
        }
    }

    removePowerSuppliesGroup(index: number) {
        this.powerSuppliesGroups.splice(index, 1);
    }
}