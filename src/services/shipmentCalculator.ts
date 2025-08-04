import { SHIPMENT_REFERENCES } from "../constants/shipmentPriceConstant"

export function getRefWeightPrice(weight: number, type: string, method: string, supplier: string) {
    const refWeight = SHIPMENT_REFERENCES.find(
        (ref) => type == ref.type && method == ref.method && supplier == ref.supplier && weight <= ref.weight
    );
    return refWeight?.price ?? 0;

}

export function calcEstimateShipmentCost(weight: number, price: number, supplier: string) {
    const estimate_shipment = weight * price;
    const roundedNearest = Math.round(estimate_shipment / 1000) * 1000; // 8000
    if (supplier == "Suntop") {
        return roundedNearest;
    } else {
        return Math.round(price);
    }
}


//shipping AIR
const COST_ESTIMATE = {
    EXW_CHARGES: 8910,
    D_O_FEE: 350,
    CUSTOM_CLEARANCE: 2000,
    TRANSPORTATION_4WJ: 2600,
    LABOR: 800,
};
type RateTier = {
    min: number;
    max?: number;
    rateFrom: number;
    rateTo: number;
};

const rateTable: RateTier[] = [
    { min: 0, max: 199.99, rateFrom: 2.8, rateTo: 2.5 },
    { min: 200, max: 299.99, rateFrom: 2.3, rateTo: 1.9 },
    { min: 300, max: 500, rateFrom: 1.8, rateTo: 1.7 },
];

export function getRate(weight: number): number {
    const tier = rateTable.find(({ min, max }) => {
        return weight >= min && (max === undefined || weight <= max);
    });

    return tier ? tier.rateTo : 0;
}

export const calcShippingAirCost = (weight: number): number => {
    const exchange_rate = 33;
    const rateChange = getRate(weight);
    const AIR_FREIGHT = Math.floor(rateChange * weight * exchange_rate);
    const total_cost = Object.values(COST_ESTIMATE).reduce(
        (sum, cost) => sum + cost,
        AIR_FREIGHT
    );
    return total_cost;
};

//shipping SEA
const COST_ESTIMATE_SEA = {
    EXW_CHARGES: 11220,
    D_O_FEE: 1400,
    CUSTOM_CLEARANCE: 2000,
    TRANSPORTATION_4WJ: 2600,
    LABOR: 800,
};
type RateTierSea = {
    min: number;
    max?: number;
    rate: number
};

const rateTableSea: RateTierSea[] = [
    { min: 0, max: 4.99, rate:0.10 },
    { min: 5, max: 9.99, rate:5 },
    { min: 10, max: 15, rate:10 },
];

export function getRateSea(cbm: number): number {
    const tier = rateTableSea.find(({ min, max }) => {
        return cbm >= min && (max === undefined || cbm <= max);
    });

    return tier ? tier.rate : 0;
}

export const calcShippingSeaCost = (cbm: number): number => {
    const exchange_rate = 33;
    const TERMINAL_CHARGE =  990 ;
    const rateChange = getRateSea(cbm);
    const terminal_charge = TERMINAL_CHARGE*cbm;
    const SEA_FREIGHT = Math.floor((rateChange * cbm * exchange_rate)+terminal_charge);
    const total_cost = Object.values(COST_ESTIMATE_SEA).reduce(
        (sum, cost) => sum + cost,
        SEA_FREIGHT,
    );
    console.log('cbm', cbm)
    return total_cost;
};

//DHL
function getFreightCharges(weight: number): number {
    const data: [number, number][] = [
        [0.5, 1675.69],
        [1.0, 1876.38],
        [1.5, 2077.07],
        [2.0, 2277.76],
        [2.5, 2528.09],
        [3.0, 2720.15],
        [3.5, 2912.21],
        [4.0, 3104.27],
        [4.5, 3296.33],
        [5.0, 3488.39],
        [5.5, 3648.08],
        [6.0, 3807.77],
        [6.5, 3967.46],
        [7.0, 4127.15],
        [7.5, 4286.84],
        [8.0, 4446.53],
        [8.5, 4606.22],
        [9.0, 4765.91],
        [9.5, 4925.6],
        [10.0, 5085.29],
        [10.5, 5104.71],
        [11.0, 5124.13],
        [11.5, 5143.55],
        [12.0, 5162.97],
        [12.5, 5182.39],
        [13.0, 5201.81],
        [13.5, 5221.23],
        [14.0, 5240.65],
        [14.5, 5260.07],
        [15.0, 5279.49],
        [15.5, 5298.91],
        [16.0, 5318.33],
        [16.5, 5337.75],
        [17.0, 5357.17],
        [17.5, 5376.59],
        [18.0, 5396.01],
        [18.5, 5415.43],
        [19.0, 5434.85],
        [19.5, 5454.27],
        [20.0, 5473.69],
        [20.5, 5565.41],
        [21.0, 5657.13],
        [21.5, 5748.85],
        [22.0, 5840.57],
        [22.5, 5932.29],
        [23.0, 6024.01],
        [23.5, 6115.73],
        [24.0, 6207.45],
        [24.5, 56299.17],
        [25.0, 6390.89],
        [25.5, 6482.61],
        [26.0, 6574.33],
        [26.5, 6666.05],
        [27.0, 6757.77],
        [27.5, 6849.49],
        [28.0, 6941.21],
        [28.5, 7032.93],
        [29.0, 7124.65],
        [29.5, 7216.37],
        [30.0, 7308.09],
    ];

    if (weight <= 30) {
        const roundedWeight = Math.ceil(weight * 2) / 2;
        const entry = data.find(([w]) => w === roundedWeight);
        return entry ? entry[1] : -1;
    } else {
        const roundedWeight = Math.ceil(weight);
        if (roundedWeight <= 70) {
            return roundedWeight * 118.69;
        } else if (roundedWeight <= 300) {
            return roundedWeight * 98.29;
        } else {
            return roundedWeight * 107.9;
        }
    }
}
export const calcDHLCost = (weight: number): number => {
    const Percent_of_Fuel_Surcharge = 31;
    const ceilingWeight = Math.ceil(weight * 2) / 2;
    const freightCharges = getFreightCharges(ceilingWeight);
    const overWeight = weight > 70 ? 3000 : 0;
    const ess_Surcharge = ceilingWeight * 8.25;
    const ful_Surcharge =
        ((freightCharges + ess_Surcharge) * Percent_of_Fuel_Surcharge) / 100;
    const total_shipment =
        freightCharges + ess_Surcharge + ful_Surcharge + overWeight;
    return parseFloat(total_shipment.toFixed(2));
};