export interface IShipmentCostReq{
    supplier: string;
    quantity: number;
    panel_size: IPanelSize;
    cavity_up: number;
    shipment_cost:IShipmentCost;
}

export interface IPanelSize{
    width: number;
    height: number;
    unit: string;
}

export interface IShipmentCost{
    shipping_type: string;
    shipping_method: string;
    cbm: number;
    combination: boolean;
}