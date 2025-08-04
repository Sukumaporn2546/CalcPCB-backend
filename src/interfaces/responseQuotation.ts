

export interface IQuotationRecordRes{
    success: boolean;
    message: string;
    data: IQuotationRecordArray[];
}

export interface IQuotationRecordArray{
    model_name: string;
    supplier: string;
    cost_per_pcb: number;
    total_cost_per_pcb: number;
    unit_price: number;
    total_price: number;
    profit_price: number;
    all_profit_price: number;
    status: string;
}