
export function calcBoardArea(width: number, height: number, cavity: number): number {
    return ((width * height) / 645.16 / cavity); // in²
}

export function calcBoardAreaM2(width: number, height: number, up: number, quantity: number): number {
    return (width*height)/1000000*(quantity/up);
}

export function calcMaterialCost(price: number, area: number, rate: number): number {
    return area * price * rate;  //cost
}

export function calcTotalMaterialCost(price: number, quantity: number): number{
    return (price*quantity); //all cost from supp
}

export function calcAllTotalCost(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number): number{
    return ((fixCharge +  expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost));
}
export function calcAllCostPerPCB(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number, quantity: number): number{
    return (fixCharge +  expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost)/quantity;
}

export function calcWeight(width: number, height: number, up: number, quantity: number){
    return parseFloat(((width*height)/up*quantity*2.8/1000000).toFixed(2));
}

export function calcCostFromSupAndAdmin(cost_per_piece: number, all_total_cost: number, admin_fee_per_pcb: number, total_admin_fee: number, quantity: number): {cost_per_pcb: number, total_cost_pcb: number}{
    const total_cost_pcb = all_total_cost + total_admin_fee;
    const cost_per_pcb = total_cost_pcb /quantity;
    return {
        cost_per_pcb, total_cost_pcb
    }
}
