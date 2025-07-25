export interface IShipmentCost {
    shipping_type: string;
    shipping_method: string;
    shipping_cost: number;
    combination: boolean;
}

export interface IVariableCost {
    fixture_charge: number;
    express_cost: number;
    handling: number;
    fly_probe: number;
    shipment_cost: IShipmentCost;
}

export interface IFixCost {
    setup_cost: number;
    tooling: number;
}

export interface ICost {
    cost_usd: number;
    cost_per_pcb: number;
    area_in2_per_pcb: number;
    total_cost: number;
    all_cost_per_pcb: number;
    all_total_cost: number;
    weight_kg: number;
    fix_cost: IFixCost;
    variable_cost: object;
    quantity: number;
    shipment_per_pcb: number;
    admin_fee_cost: IAdminFee;
    real_cost: IRealCost;
    exchange_rate: number;
}
export interface IAdminFee {
    total_admin_fee: number;
    admin_fee_per_pcb: number;
    sample_size: number;
}
export interface IRealCost {
    cost_per_pcb: number;
    total_cost_pcb: number;
}

export interface IPrices {
    unitPrice: number;
    totalPrice: number;
}

export interface IProfits {
    profitPrice: number;
    allProfitPrice: number;
}

export interface IPrice {
    prices: IPrices;
    profits: IProfits;
}

export interface IResultCompareArray {
    supplier: string;
    model_name: string;
    cost: ICost;
    price: IPrice;
}

export interface IResultCompare {
    success: boolean;
    message: string;
    model_name: string;
    results: IResultCompareArray[];
}
export interface IResultCompareRes {
    success: boolean;
    message: string;
    model_name: string;
    results: IResultCompareArrayRes[];
}
export interface IResultCompareArrayRes {
    supplier: string;
    model_name: string;
    cost: {
        cost_usd: number;
        all_cost_per_pcb: number;
        all_total_cost: number;
        shipment_per_pcb: number;
        real_cost: object;
    };
    price: {
        prices: {
            unitPrice: number;
            totalPrice: number;
        };
        profits: {
            profitPrice: number;
            allProfitPrice: number;
        };
    };
}
