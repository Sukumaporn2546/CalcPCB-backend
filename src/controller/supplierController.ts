import { Request, Response } from "express";
import SupplierModel from '../models/supplierModel';
import PCBModel from "../models/PCBModel";


export const getAllSup = async (req: Request, res: Response) => {

    try {
        //for save model in supplier
        // const uniqueSuppliers = await PCBModel.aggregate([
        //     {
        //         $group: {
        //             _id: '$supplier',
        //             models: { $addToSet: '$model_name' }
        //         }
        //     }
        // ]);

        // for (const sup of uniqueSuppliers) {
        //     await SupplierModel.updateOne(
        //         { sup_name: sup._id },
        //         { $set: { models: sup.models } },
        //         { upsert: true }
        //     );
        // }

        const allSup = await SupplierModel.find().sort({ createdAt: -1 }); // ดึงข้อมูลทั้งหมด

        if (allSup.length == 0) {
            res.json({
                success: true,
                message: "ไม่พบข้อมูลซัพพลายเออร์"
            })
        }
        res.json({
            success: true,
            message: "ส่งข้อมูลซัพพลายเออร์สำเร็จ",
            data: allSup
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
        })
    }
};

export const createSup = async (req: Request, res: Response) => {
    try {
        const supData = req.body;
        if (!supData) {
            res.status(400).json({
                success: false,
                message: 'ไม่พบข้อมูลซัพพลายเออร์ที่ต้องการบันทึก'
            })
        }

        const newSup = new SupplierModel(supData);
        const savedSup = await newSup.save();

        res.status(201).json({
            success: true,
            message: 'บันทึกข้อมูลซัพพลายเออร์สำเร็จ'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
        })
    }
};


export const updateSup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedSup = await SupplierModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedSup) {
            res.status(404).json({
                success: false,
                message: 'ไม่พบซัพพลายเออร์ที่ต้องการแก้ไข'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'แก้ไขข้อมูลสำเร็จ',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
        })
    }
};

export const deleteSup = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteModel = await SupplierModel.findOneAndDelete({ _id: id });
        if (!deleteModel) {
            res.status(404).json({
                success: false,
                message: 'ไม่พบซัพพลายเออร์'
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: 'ลบข้อมูลสำเร็จ'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
        })
    }
}

export const getSupOnModel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { model_name } = req.query
        const models = await PCBModel.find({ model_name: model_name });
        const suppliers = models.map(model => model.supplier);

        res.status(200).json({ suppliers });
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