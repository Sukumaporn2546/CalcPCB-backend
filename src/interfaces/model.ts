// body for front to send to back
import { Types } from 'mongoose';
export interface CalcPCBBody {
    model_name: string,
    sup_name: string,
    material: {

    },
    layers: number,
    quantity: number,
    pcb_size: {
        width: number,
        height: number,
        unit: string
    },
    panel_size: {
        width: number,
        height: number,
        unit: string
    },
    cavity_up: number,
    thickness: string,
    solder_mask: string,
    legend_silk_screen: string,
    surface_finish: string,
    copper_weight: string

    fix_cost: {
        setup_cost: number,
        tooling: number
    }
    variable_cost: {
        fixture_charge: number,
        express_cost: number,
        handling: number,
        fly_probe: number,
        shipment_cost: {
            shipping_type: string,
            shipping_method: string,
            shipping_cost: number,
            combination: boolean,
        }
    }
}

export interface IPCBinDB {
    _id?: string;
    model_name: string,
    supplier: string,
    supplier_id: Types.ObjectId,
    material: {
        layers: string,
        base_material: string,
        thickness: string,
        copper_weight: string,
        surface_finish: string,
    },

    pcb_size_mm: {
        width: number,
        height: number,
    },

    panel_size_mm: {
        width: number,
        height: number,
    },

    cavity_up: number,
    solder_mask: string,
    legend_silk_screen: string,
    process: string,
    quantity: number,
    cost_usd: number,
    cost_in2: number,
    cost_in2_many?: {
        [key: string]: number; 
    };
    cost_usd_many: object,
    area_in2_per_pcb: number,
    price_usd_per_in2: number,
    price_thb_per_in2: number,
    area_m2_per_pcb: number,
    weight_kg: number,

    cost: number,
    totalCost: number,

    fix_cost: {
        set_up_cost: number,
        tooling: number,
    },

    variable_cost: {
        fixture_charge: number,
        express_cost: number,
        handling: number,
        fly_probe: number,

        shipment_cost: {
            shipping_type: string,
            shipping_method: string,
            shipping_cost: number,
            combine: boolean,
        },
    },
} 
