import { calcSellingPrice, calcSellingProfit } from './priceCalculator';
import {findSampleSize, findTimePerSize, calcTimeAQL, calcCostAdminFee } from './adminCalculatorUtil';
import {calcCostFromSupAndAdmin} from './costCalculatorUtil'
interface CalculatePriceInput {
    cost_per_piece: number,
    margin_percent: number,
    quantity: number,
    all_total_cost: number,
    area_in2_per_pcb: number
}

function calCulateAdminFee(data: CalculatePriceInput) {
    const {quantity, area_in2_per_pcb} = data;
    const sampleSize = findSampleSize(quantity);
    const timePerSize = findTimePerSize(area_in2_per_pcb);
    const timeAQL = calcTimeAQL(sampleSize, timePerSize);
    
    return calcCostAdminFee(timeAQL, sampleSize);
}


export function calculatePCBPrice(data: CalculatePriceInput) {
    const { cost_per_piece, margin_percent, quantity, all_total_cost } = data
    const admin_fee = calCulateAdminFee(data);
    const realCost = calcCostFromSupAndAdmin(cost_per_piece, all_total_cost, admin_fee.admin_fee_per_pcb, admin_fee.total_admin_fee, quantity);
    const prices = calcSellingPrice(cost_per_piece, admin_fee.admin_fee_per_pcb, margin_percent, quantity);
    const profits = calcSellingProfit(realCost.cost_per_pcb, prices.unitPrice, realCost.total_cost_pcb, prices.totalPrice)
    return {
        prices,
        profits,
    }
}