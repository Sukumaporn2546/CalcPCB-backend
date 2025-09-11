import mongoose, { Schema } from "mongoose";

// Schema definition
const quotationSchema: Schema = new Schema(
  {
    model_name: { type: String },
    supplier: { type: String, required: true },
    supplier_id: { type: Schema.Types.ObjectId, ref: "SUP" },
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
    legend_silk_screen: { type: String, required: true },
    process: { type: [String] },
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
            forwarder: {type: String}
        },
    },
    cost_per_pcb: { type: Number },
    total_cost_pcb: { type: Number },
    unit_price: { type: Number },
    total_price: { type: Number },
    profit_price: { type: Number },
    all_profit_price: { type: Number },
    customer_name: { type: String },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Completed",
        "Failed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Create and export model
const QuotationRecordModel = mongoose.model("quotationRecord", quotationSchema);

export default QuotationRecordModel;
