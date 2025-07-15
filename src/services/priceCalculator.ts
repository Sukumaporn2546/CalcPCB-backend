export function calcSellingPrice(costPerPiece: number, adminFee: number, marginPercent: number, quantity: number): {unitPrice: number, totalPrice: number} {
    // return Number((costPerPiece + admin +((costPerPiece * margin)/100)).toFixed(2));
    const totalCost = costPerPiece + adminFee;
    const marginMultiplier = 1 + marginPercent / 100;
    const unitPrice = parseFloat((totalCost * marginMultiplier).toFixed(2));
    const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));
    
    return {unitPrice, totalPrice};
}

