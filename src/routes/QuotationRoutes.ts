import {
    createQuotationRecord,
    getQuotationRecord,
    updateQuotation,
    deleteQuotation
} from "../controller/quotationController"
import express from "express";
const router = express.Router();


router.get("/", getQuotationRecord);
router.post("/create", createQuotationRecord);
router.put("/update/:id", updateQuotation);
router.delete("/del/:id", deleteQuotation);


export default router;