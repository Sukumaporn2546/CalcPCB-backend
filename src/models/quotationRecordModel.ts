import mongoose, { Schema } from "mongoose";

// Schema definition
const quotationSchema: Schema = new Schema(
  {
    model_name: { type: String },
    supplier: { type: String, required: true },
    supplier_id: { type: Schema.Types.ObjectId, ref: "SUP" },
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
