import express from "express";

import { 
    getAllPCB, 
    getAllModelPCB,
    getModelPCB, 
    createPCB, 
    calculateCost, 
    calculateSellingPrice,
    getModelNameFromSup,
    comparePriceFromSup,
    calcShipmentCost,
    updateModePCB,
    deleteModelPCB,
    calcCostFromAdmin,
    calcCostBahtPerPcs
} from "../controller/pcbController";


const router = express.Router();

router.get("/", getAllModelPCB);
router.get("/pcb", getModelPCB);

router.get("/model-name", getModelNameFromSup);
router.post("/cost-admin", calcCostFromAdmin);


router.post("/cost", calculateCost);
router.post("/change-cost", calcCostBahtPerPcs);
router.post("/selling-price", calculateSellingPrice);
router.post("/create-pcb", createPCB);

router.post("/compare-price", comparePriceFromSup)
router.post("/shipment-cost", calcShipmentCost);


router.put("/update-model/:id", updateModePCB);

router.delete("/del/:id", deleteModelPCB);

export default router;

