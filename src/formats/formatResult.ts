import {
  IResultCompare,
  IResultCompareArrayRes,
  IResultCompareRes,
} from "../interfaces/resultCompare";

export const formatResultCompareRes = (
  result: IResultCompare
): IResultCompareRes => {
  const res = {
    message: result.message,
    success: result.success,
    model_name: result.model_name,
    results: result.results.map(
      (e): IResultCompareArrayRes => ({
        supplier: e.supplier,
        model_name: e.model_name,
        cost: {
          cost_usd: e.cost.cost_usd,
          all_cost_per_pcb: e.cost.all_cost_per_pcb,
          all_total_cost: e.cost.all_total_cost,
          shipment_per_pcb: e.cost.shipment_per_pcb,
          real_cost: e.cost.real_cost,
        },
        price: {
          prices: {
            unitPrice: e.price.prices.unitPrice,
            totalPrice: e.price.prices.totalPrice,
          },
          profits: {
            profitPrice: e.price.profits.profitPrice,
            allProfitPrice: e.price.profits.allProfitPrice,
          },
        },
        spec_model: e.spec_model,
      })
    ),
  };
  return res;
};
