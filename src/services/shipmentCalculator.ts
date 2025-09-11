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
    { min: 100, max: 199.99, rateFrom: 2.8, rateTo: 2.5 },
    { min: 200, max: 299.99, rateFrom: 2.3, rateTo: 1.9 },
    { min: 300, max: 500, rateFrom: 1.8, rateTo: 1.7 },
];


export function getRate(weight: number): number {
    const tier = rateTable.find(({ min, max }) => {
        return weight >= min && (max === undefined || weight <= max);
    });

    if (!tier) return 0; //for < 100 kg

    // ถ้า max ไม่มี หรือ weight == min, คืน rateFrom เลย
    if (tier.max === undefined || tier.min === tier.max) return tier.rateFrom;

    // Linear interpolation
    const { min, max, rateFrom, rateTo } = tier;
    const rate = rateFrom + ((weight - min) / (max - min)) * (rateTo - rateFrom);
    return rate;
}

export function calcWLess100kg(weight: number, exchange_rate_yuan: number, exchange_rate: number): number {
    const price_yuan: [number, number][] = [
        [0.5, 67.59],
        [1.0, 91.53],
        [1.5, 108.21],
        [2.0, 124.89],
        [2.5, 141.57],
        [3.0, 141.73],
        [3.5, 157.55],
        [4.0, 173.37],
        [4.5, 189.19],
        [5.0, 205.01],
        [5.5, 205.73],
        [6.0, 219.50],
        [6.5, 233.78],
        [7.0, 248.06],
        [7.5, 262.33],
        [8.0, 276.60],
        [8.5, 290.88],
        [9.0, 305.16],
        [9.5, 319.43],
        [10.0, 333.70],
        [10.5, 333.67],
        [11.0, 344.95],
        [11.5, 356.21],
        [12.0, 367.49],
        [12.5, 378.75],
        [13.0, 390.03],
        [13.5, 401.30],
        [14.0, 412.57],
        [14.5, 423.84],
        [15.0, 435.11],
        [15.5, 446.38],
        [16.0, 457.66],
        [16.5, 468.92],
        [17.0, 480.20],
        [17.5, 491.46],
        [18.0, 502.74],
        [18.5, 514.01],
        [19.0, 525.28],
        [19.5, 536.55],
        [20.0, 547.82],
        [20.5, 559.09]
    ];

    // convert to Baht
    const price_baht: [number, number][] = price_yuan.map(
        item => [item[0], parseFloat((item[1] * exchange_rate_yuan).toFixed(2))]
    );

    // ถ้าน้ำหนักเกิน 20.5
    if (weight > 20.5) {
        if (weight <= 71) {
            return parseFloat(((3.3 * exchange_rate) * weight).toFixed(2));
        } else if (weight <= 100) {
            return parseFloat(((3.0 * exchange_rate) * weight).toFixed(2));
        } else {
            throw new Error("Weight exceeds 100 kg");
        }
    }

    // หาน้ำหนักตรงกับตาราง
    const exact = price_baht.find(item => item[0] === weight);
    if (exact) {
        return Math.round(exact[1]); // คืนค่าอัตราเงินตรง ๆ
    }

    // ถ้าไม่ตรง ใช้ linear interpolation
    let lower: [number, number] | null = null;
    let upper: [number, number] | null = null;

    for (let i = 0; i < price_baht.length; i++) {
        if (price_baht[i][0] < weight) lower = price_baht[i];
        if (price_baht[i][0] > weight) {
            upper = price_baht[i];
            break;
        }
    }

    if (lower && upper) {
        // linear interpolation
        const interpolated = lower[1] + ((upper[1] - lower[1]) / (upper[0] - lower[0])) * (weight - lower[0]);
        return parseFloat(interpolated.toFixed(2));
    }

    // ถ้าอยู่นอกช่วงตาราง (เล็กเกินไปหรือมากเกินไป)
    throw new Error("Weight out of range");
}



export const calcShippingAirCost = (weight: number, exchange_rate_yuan: number, exchange_rate: number): number => {
    //exchange_rate = 33;
    const rateChange = parseFloat(getRate(weight).toFixed(2));
    console.log('ratechange', rateChange)
    if (rateChange == 0) {
        const price_for_less_100_kg = calcWLess100kg(weight, 5, exchange_rate);
        return price_for_less_100_kg;
    }
    console.log('rate', rateChange)
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
    { min: 0, max: 4.99, rate: 0.10 },
    { min: 5, max: 9.99, rate: 5 },
    { min: 10, max: 15, rate: 10 },
];

export function getRateSea(cbm: number): number {
    const tier = rateTableSea.find(({ min, max }) => {
        return cbm >= min && (max === undefined || cbm <= max);
    });

    return tier ? tier.rate : 0;
}

export const calcShippingSeaCost = (cbm: number, rate: number): number => {
    const exchange_rate = 33;
    const TERMINAL_CHARGE = 990;
    //const rateChange = getRateSea(cbm);
    const rateChange = rate;
    const terminal_charge = TERMINAL_CHARGE * cbm;
    const SEA_FREIGHT = Math.floor((rateChange * cbm * exchange_rate) + terminal_charge);
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