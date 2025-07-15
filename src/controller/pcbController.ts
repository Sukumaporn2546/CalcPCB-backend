import PCBModel from "../models/PCBModel";
import SupplierModel from "../models/supplierModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { calcBoardArea, calcMaterialCost, calcTotalMaterialCost, calcWeight, calcAllCostPerPCB, calcAllTotalCost } from "../services/costCalculator";
import {calcSellingPrice} from "../services/priceCalculator";
import {IPCBinDB} from '../interfaces/allInterfaces'

export const getAllPCB = async (req: Request, res: Response) => {
    try {
        const allPCBs = await PCBModel.find(); // ดึงข้อมูลทั้งหมด
        res.json(allPCBs);
    } catch (error) {
        console.error('Error fetching PCB data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getAllSup = async (req: Request, res: Response) => {

    //const Model = mongoose.connection.collection('model');
    try {
        const allSup = await SupplierModel.find(); // ดึงข้อมูลทั้งหมด
        res.json(allSup);
    } catch (error) {
        console.error('Error fetching PCB data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//that it for show model
export const getModelPCB = async (req: Request, res: Response): Promise<void> => {
    try {
        const model_name = req.query.model_name as string;
        const supplier_name = req.query.supplier_name as string;

        if (!model_name || !supplier_name) {
            res.status(400).json({ message: 'Missing model_name or supplier_name' });
            return;
        }

        const pcb = await PCBModel.findOne({
            model_name: model_name,
            supplier: supplier_name
        });

        if (!pcb) {
            res.status(404).json({ message: 'PCB not found for this supplier' });
            return;
        }

        res.json(pcb);
    } catch (error) {
        console.error('Error fetching PCB:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createPCB = async (req: Request, res: Response) => {
    try {
        const pcbData = req.body;
        const supplierName = pcbData.supplier;
        const supplierID = await SupplierModel.findOne({ sup_name: supplierName });

        if (!supplierID) {
            res.status(404).json({ message: `Supplier ${supplierName} not found` });
        }

        pcbData.supplier_id = supplierID;

        const newPCB = new PCBModel(pcbData);
        const savedPCB = await newPCB.save();

        res.status(201).json({ message: 'PCB created successfully', data: savedPCB });
    } catch (error) {
        console.error('Error creating PCB:', error);
        res.status(500).json({ message: 'Failed to create PCB', error });
    }
};

export const createSup = async (req: Request, res: Response) => {
    try {
        const supData = req.body;

        const newSup = new SupplierModel(supData);
        const savedSup = await newSup.save();

        res.status(201).json({ message: 'PCB crated successfully', data: savedSup });
    } catch (error) {
        res.status(500).json({ message: 'Failed to crate supplier', error });
    }
};


export const updateSup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedSup = await SupplierModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSup) {
            res.status(404).json({ message: 'Sup not found' });
        }

        res.status(200).json({ message: 'Sup updated successfully', data: updatedSup });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Sup', error });
    }
};

export const getModelName = async (req: Request, res: Response): Promise<void> => {
    try {
        const modelNames = await PCBModel.find().distinct('model_name');

        res.status(200).json({ modelNames });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get model names', error });
    }
};

export const getSupName = async (req: Request, res: Response): Promise<void> => {
    try {
        const supplierNames = await SupplierModel.find().distinct('sup_name');
        res.status(200).json({ supplierNames });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get sup names', error });
    }
}

export const calculateCost = async (req: Request, res: Response): Promise<void> => {
    try {
        const allData = req.body;
        if (!allData) {
            res.status(400).json({ message: 'Missing model PCB data!' });
            return;
        }
        const { panel_size, quantity, cavity_up, pcb_size, model_name, material, fix_cost, variable_cost } = allData;
        const { width: width_panel, height: height_panel } = panel_size;
        const { width: width_pcb, height: height_pct } = pcb_size;
        const { copper_weight } = material;
        const { setup_cost, tooling} = fix_cost;
        const { fixture_charge, express_cost, handling, fly_probe, shipment_cost: { shipping_cost }} = variable_cost;

        const areaIn2 = calcBoardArea(width_panel, height_panel, cavity_up);
//console.log(width_panel, height_panel, cavity_up);

        const models = await PCBModel.find({ model_name }) as IPCBinDB[];
        let price:number;
        if (models.length <= 1) {
            price = models[0]?.cost_in2 ?? 0;
        } else {
            let selected;
            if (cavity_up == 1 && parseFloat(copper_weight) > 1) {
                selected = models.find((pcb: any) =>
                    pcb.cavity_up === 1 && parseFloat(pcb.material?.copper_weight || "0") > 1
                )
            } else if (cavity_up == 3 && quantity <= 1500) {
                selected = models.find((pcb: any) =>
                    pcb.cavity_up === 3 && pcb.quantity <= 1500 
                )
            } else if (cavity_up == 3 && quantity > 1500) {
                selected = models.find((pcb: any) =>
                    pcb.cavity_up === 3 && pcb.quantity > 1500 
                )
            } else if (cavity_up == 1 && quantity <= 1500) {
                selected = models.find((pcb: any) =>
                    pcb.cavity_up === 1 && pcb.quantity <= 1500 
                )
            }
            else if (cavity_up == 1 && quantity > 1500) {
                selected = models.find((pcb: any) =>
                    pcb.cavity_up === 1 && pcb.quantity > 1500 
                )
            }
            price = selected?.cost_in2 ?? 0;
        }

        const cost = calcMaterialCost(price, areaIn2);
        const totalCost = calcTotalMaterialCost(cost, quantity);
        const allCostPerPCB = calcAllCostPerPCB(fixture_charge, express_cost, handling, fly_probe, shipping_cost, setup_cost, tooling, totalCost, quantity);
        const allTotalCost = calcAllTotalCost(fixture_charge, express_cost, handling, fly_probe, shipping_cost, setup_cost, tooling, totalCost )
        const weight = calcWeight(width_panel, height_panel, cavity_up, quantity);


        const result = {
            cost_usd: cost,
            area_in2_per_pcb: areaIn2,
            total_cost: totalCost,
            all_cost_per_pcb: allCostPerPCB,
            all_total_cost: allTotalCost,
            weight_kg: weight
        }
        //console.log(result);
        res.status(200).json({
            message: 'calculate cost pcb',
            data: result,
        })

    } catch (error) {
        res.status(500).json({ message: 'Failed to get cost', error });
    }
}


export const calculateSellingPrice = async (req: Request, res: Response) =>{
    try{
        const { cost_per_piece, admin_fee, margin_percent, quantity} = req.body;

        if(!cost_per_piece || !admin_fee || !margin_percent){
            res.status(400).json({message: "Missing parameters"});
            return;
        }

        const result = calcSellingPrice(cost_per_piece, admin_fee, margin_percent, quantity);

        res.status(200).json({
            price: result
        });

    } catch(error){
        res.status(500).json({ message: 'Failed to get selling price', error });
    }
}