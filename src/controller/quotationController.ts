import QuotationRecordModel from "../models/quotationRecordModel";
import { Request, Response } from "express";
import SupplierModel from "../models/supplierModel";

export const createQuotationRecord = async (req: Request, res: Response) => {
  try {
    const quotationData = req.body;
    if (!quotationData) {
      res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูลที่ต้องการบันทึก",
      });
      return;
    }
    const supplierName = quotationData.supplier;
    const supplierID = await SupplierModel.findOne({ sup_name: supplierName });

    if (!supplierID) {
      res.status(404).json({
        success: false,
        message: `ไม่พบซัพพลายเออร์ชื่อ ${supplierName}`,
      });
      return;
    }

    quotationData.supplier_id = supplierID;

    const newQuotation = new QuotationRecordModel(quotationData);
    const savedQuotation = await newQuotation.save();
    res.status(201).json({
      success: true,
      message: "บันทึกใบสั่งซื้อสำเร็จ",
      //data: savedQuotation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

export const getQuotationRecord = async (req: Request, res: Response) => {
  try {
    const quotations = await QuotationRecordModel.find()
      .select("-__v -supplier_id")
      .lean()
      .sort({ createdAt: -1 });

    if (quotations.length == 0) {
      res.status(200).json({
        success: true,
        message: "ไม่พบข้อมูล",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "ส่งข้อมูลสำเร็จ",
      data: {
        quotations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

export const updateQuotation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allowedFields = [
      "model_name",
      "supplier",
      "customer_name",
      "cost_per_pcb",
      "total_cost_pcb",
      "unit_price",
      "total_price",
      "profit_price",
      "all_profit_price",
      "status",
    ];

    const sanitizedBody = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );
    const updated = await QuotationRecordModel.findByIdAndUpdate(
      id,
      sanitizedBody,
      { new: true }
    ); //หลังจากอัปเดตเสร็จ ให้คืนค่าข้อมูลใหม่ล่าสุด (ที่ถูกอัปเดตแล้ว)
    if (!updated) {
      res.status(404).json({
        success: false,
        message: "ไม่พบข้อมูล",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "แก้ไขประวัติสำเร็จ",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

export const deleteQuotation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteModel = await QuotationRecordModel.findOneAndDelete({
      _id: id,
    });
    if (!deleteModel) {
      res.status(404).json({
        success: false,
        message: "ไม่พบประวัติ",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};
