import mongoose, { Schema, Document, model } from 'mongoose';


// Schema definition
const PCBSchema: Schema = new Schema({
    model_name: { type: String, required: true },
    supplier: { type: String, required: true },
    supplier_id: { type: Schema.Types.ObjectId, ref: 'SUP' },  
    material: {
        layers: { type: String, required: true },
        base_material: { type: String, required: true },
        thickness: { type: String, required: true },
        copper_weight: { type: String, required: true },
        surface_finish: { type: String, required: true },
    },

    pcb_size_mm: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },

    panel_size_mm: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },

    cavity_up: { type: Number, required: true },
    solder_mask: { type: String, required: true },
    legend_silk_screen: {type: String, required: true},
    process: {type: String, required: true},
    quantity: { type: Number, required: true },
    cost_usd: { type: Number, required: true },
    cost_in2: { type: Number},

    area_in2_per_pcb: { type: Number, required: true },
    price_usd_per_in2: { type: Number, required: true },
    price_thb_per_in2: { type: Number, required: true },
    area_m2_per_pcb: { type: Number, required: true },
    weight_kg: { type: Number, required: true },

    cost:{ type: Number},
    totalCost:{ type: Number},

    fix_cost: {
        set_up_cost: { type: Number, required: true },
        tooling: { type: Number, required: true },
    },

    variable_cost: {
        fixture_charge: { type: Number, required: true },
        express_cost: { type: Number, required: true },
        handling: { type: Number, required: true },
        fly_probe: { type: Number, required: true },

        shipment_cost: {
            shipping_type: { type: String, required: true },
            shipping_method: { type: String, required: true },
            shipping_cost: { type: Number, required: true },
            combine: { type: Boolean, required: true },
        },
    },
} , { timestamps: true });

// Create and export model
const PCBModel = mongoose.model('PCB', PCBSchema);

export default PCBModel;
