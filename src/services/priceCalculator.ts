export function calcSellingPrice(costPerPiece: number, adminFee: number, marginPercent: number, quantity: number): {unitPrice: number, totalPrice: number} {
    // return Number((costPerPiece + admin +((costPerPiece * margin)/100)).toFixed(2));
    const totalCost = costPerPiece + adminFee;
    const marginMultiplier = 1 + marginPercent / 100;
    const unitPrice = parseFloat((totalCost * marginMultiplier).toFixed(2));
    const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));
    
    return {unitPrice, totalPrice};
}

export function calcSellingProfit(cost_per_pcb: number, unitPrice: number, total_cost_per_pcb: number, totalPrice: number): {profitPrice: number, allProfitPrice: number }{
    const profitPrice = parseFloat((unitPrice-cost_per_pcb).toFixed(2));
    const allProfitPrice = parseFloat((totalPrice-total_cost_per_pcb).toFixed(2));
    return {profitPrice, allProfitPrice};
}

