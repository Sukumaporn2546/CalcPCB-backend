import mongoose, { Schema, Document, model } from 'mongoose';



// Schema definition
const supplierSchema: Schema = new Schema({
    sup_name: { type: String, required: true },
}, { timestamps: true });

// Create and export model
const SupplierModel = mongoose.model('SUP', supplierSchema);

export default SupplierModel;
