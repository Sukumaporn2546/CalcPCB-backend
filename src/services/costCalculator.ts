
export function calcBoardArea(width: number, height: number, cavity: number): number {
    return ((width * height) / 645.16 / cavity); // in²
}

export function calcBoardAreaM2(width: number, height: number, up: number, quantity: number): number {
    return Number(((width*height)/1000000*(quantity/up)).toFixed(2));
}

export function calcMaterialCost(price: number, area: number): number {
    return area * price * 35;  //cost
}

export function calcTotalMaterialCost(price: number, quantity: number): number{
    return Number((price*quantity).toFixed(2)); //all cost from supp
}

export function calcAllTotalCost(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number): number{
    return Number((fixCharge +  expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost).toFixed(2));
}
export function calcAllCostPerPCB(fixCharge: number, expressCost: number, handling: number, flyProbe: number, shipmentCost: number, setupCost: number, tooling: number, totalCost: number, quantity: number): number{
    return Number(((fixCharge +  expressCost + handling + flyProbe + shipmentCost + setupCost + tooling + totalCost)/quantity).toFixed(2));
}

export function calcWeight(width: number, height: number, up: number, quantity: number){
    return Number(((width*height)/up*quantity*2.8/1000000).toFixed(2));
}


