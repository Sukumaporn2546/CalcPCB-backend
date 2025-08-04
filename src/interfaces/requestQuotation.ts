export interface ICreateReq{
    model_name: string;
    supplier: string;
    cost_per_pcb: number,
    total_cost_per_pcb: number;
    unit_price: number;
    total_price: number;
    profit_price: number;
    all_profit_price: number;
    customer_name: string;
    status: string;
}