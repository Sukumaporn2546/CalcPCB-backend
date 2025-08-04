import {
    updateSup,
    getAllSup,
    getSupOnModel,
    getSupName,
    createSup,
    deleteSup
} from "../controller/supplierController"
import express from "express";
const router = express.Router();


router.get("/", getAllSup);
router.get("/sup-name", getSupName );
router.get("/all-model-name", getSupOnModel); //not use

router.post("/create", createSup);

router.put("/update/:id", updateSup); 

router.delete("/del/:id", deleteSup);

export default router;