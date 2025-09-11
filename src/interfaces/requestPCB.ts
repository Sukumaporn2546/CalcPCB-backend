export interface IShipmentCostReq{
    supplier: string;
    quantity: number;
    panel_size: IPanelSize;
    cavity_up: number;
    shipment_cost:IShipmentCost;
    exchange_rate: number;
    currency: string;
}

export interface IPanelSize{
    width: number;
    height: number;
    unit: string;
}

export interface IShipmentCost{
    shipping_type: string;
    shipping_method: string;
    shipping_cost: string;
    cbm: number;
    rateOceanFreight: number;
    combination: boolean;
}