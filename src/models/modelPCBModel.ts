import mongoose, { Schema, Document, model } from 'mongoose';



// Schema definition
const modelSchema: Schema = new Schema({
    model_name: { type: String, required: true },
    supplier: {  type: [String] },
    supplier_id: { type: [Schema.Types.ObjectId], ref: 'SUP' },
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
        unit: {type: String}
    },

    panel_size_mm: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        unit: {type: String}
    },

    cavity_up: { type: Number, required: true },
    solder_mask: { type: String, required: true },
    legend_silk_screen: { type: String, required: true },
    process: { type: [String] },
}, { timestamps: true });

// Create and export model
const modelPCBModel = mongoose.model('model', modelSchema);

export default modelPCBModel;
