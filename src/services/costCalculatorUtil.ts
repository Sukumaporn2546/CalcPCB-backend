import { fr4Prices } from "../constants/priceSqmConstant";


// in²/pcs
export function calcBoardArea(width: number, height: number, cavity: number): number {
    return ((width * height) / 645.16 / cavity);
}

// in²/order
export function calcTotalBoardArea(width: number, height: number, cavity: number, qty: number): number {
    return calcBoardArea(width, height, cavity) * qty;
}

// m²/pcs
export function calcBoardAreaPerPieceM2(width: number, height: number, up: number): number {
    return (width * height) / 1_000_000 / up;
}

// m²/order
export function calcTotalBoardAreaM2(width: number, height: number, up: number, quantity: number): number {
    return calcBoardAreaPerPieceM2(width, height, up) * quantity;
}


export function calcMaterialCost(price: number, area: number, rate: number): number {
    return area * price * rate;  //cost
}

export function calcTotalMaterialCost(price: number, quantity: number): number {
    return (price * quantity); //all cost from supp
}

export function calcAllTotalCost(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number): number {
    return ((fixCharge + expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost));
}
export function calcAllCostPerPCB(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number, quantity: number): number {
    return (fixCharge + expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost) / quantity;
}

export function calcWeight(width: number, height: number, up: number, quantity: number) {
    return parseFloat(((width * height) / up * quantity * 2.8 / 1000000).toFixed(2));
}

export function calcCostFromSupAndAdmin(cost_per_piece: number, all_total_cost: number, admin_fee_per_pcb: number, total_admin_fee: number, quantity: number, admin_cost_percent: number): { cost_per_pcb: number, total_cost_pcb: number } {
    const total_cost_pcb = (all_total_cost) + (all_total_cost * (admin_cost_percent / 100));
    const cost_per_pcb = total_cost_pcb / quantity;

    return {
        cost_per_pcb, total_cost_pcb
    }
}

export function calcCostPerPieceToBaht(exchange_rate: number, cost_usd: number) {
    return cost_usd * exchange_rate;
}

export function calcMaterialCostBaht(areaIn2: number, cost_baht: number) {
    return areaIn2 * cost_baht;
}



// คืนรายชื่อ supplier ทั้งหมดในช่วง เรียงราคาจากถูก → แพง
export function findRankPriceSupplier(sqm: number): string[] {
    const matchingRanges = fr4Prices.filter(
        range => sqm >= range.sqm_start && sqm <= range.sqm_end
    );

    if (matchingRanges.length === 0) {
        console.log(`ไม่พบข้อมูลราคาสำหรับพื้นที่ ${sqm} ตร.ม.`);
        return [];
    }

    // เรียงราคาจากถูกไปแพง
    const sortedSuppliers = matchingRanges
        .sort((a, b) => a.price - b.price)
        .map(r => r.supplier);

    // ลบชื่อ supplier ที่ซ้ำออก
    const uniqueSuppliers = [...new Set(sortedSuppliers)];

    return uniqueSuppliers;
}
