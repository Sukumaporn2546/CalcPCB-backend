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
        width: { type: Number },
        height: { type: Number },
    },

    panel_size_mm: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },

    cavity_up: { type: Number, required: true },
    solder_mask: { type: String, required: true },
    legend_silk_screen: {type: String, required: true},
    process: { type: [String] },
    quantity: { type: Number},
    cost_usd: { type: Number },
    cost_in2: { type: Number},

    cost_usd_many: {type: Object},
    cost_in2_many: {type: Object},

    area_in2_per_pcb: { type: Number},
    price_usd_per_in2: { type: Number},
    price_thb_per_in2: { type: Number},
    area_m2_per_pcb: { type: Number},
    weight_kg: { type: Number },

    cost:{ type: Number},
    totalCost:{ type: Number},

    fix_cost: {
        set_up_cost: { type: Number},
        tooling: { type: Number},
    },

    variable_cost: {
        fixture_charge: { type: Number },
        express_cost: { type: Number },
        handling: { type: Number },
        fly_probe: { type: Number},

        shipment_cost: {
            shipping_type: { type: String },
            shipping_method: { type: String },
            shipping_cost: { type: Number },
            combine: { type: Boolean },
        },
    },
} , { timestamps: true, strict: false });

// Create and export model
const PCBModel = mongoose.model('PCB', PCBSchema);

export default PCBModel;
