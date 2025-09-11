import { TIME_AQL_REFERENCES } from '../constants/timeAQLConstant'
import { SAMPLE_REFERENCES } from '../constants/sampleTestConstant';

export function findSampleSize(quantity: number): number {
    for (const range of SAMPLE_REFERENCES) {
        if (quantity <= range.lotSize) {
            return range.sampleSize;
        }
    }
    return SAMPLE_REFERENCES[SAMPLE_REFERENCES.length - 1].sampleSize;
}


export function findTimePerSize(size: number): number {
    for (const range of TIME_AQL_REFERENCES) {
        if (size <= range.sizeIn2) {
            return range.avgTime;
        }
    }
    return TIME_AQL_REFERENCES[TIME_AQL_REFERENCES.length - 1].avgTime;
}

export function calcTimeAQL(sampleSize: number, timePerSize: number): number{
    return sampleSize * timePerSize;
}


//that result
export function calcCostAdminFee(timeAQL: number, sample_size: number): {admin_fee_per_pcb: number, total_admin_fee: number, sample_size: number} {
    const total_admin_fee =  (timeAQL + 15) * 2.08;
    const admin_fee_per_pcb = total_admin_fee/sample_size;
    return {total_admin_fee, admin_fee_per_pcb, sample_size};
}

export function calcCostOfInspec (totalCost: number, total_admin_fee: number, quantity: number){
    const total_cost_inspec = totalCost+total_admin_fee;
    const cost_inspec_per_piece = total_cost_inspec/quantity;
    return {total_cost_inspec, cost_inspec_per_piece}
}