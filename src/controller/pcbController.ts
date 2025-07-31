import PCBModel from "../models/PCBModel";
import SupplierModel from "../models/supplierModel";
import modelPCBModel from "../models/modelPCBModel";
import { Request, Response } from "express";
import {
  calculatePCBCost,
  calculatePCBCostFromAITrainModel,
  calculatePCBCostFromBasePrice,
} from "../services/pcbCostService";
import { calculatePCBPrice } from "../services/pcbPriceService";
import { IPCBinDB } from "../interfaces/model";
import {
  ICost,
  IResultCompare,
  IResultCompareArray,
} from "../interfaces/resultCompare";
import { IShipmentCostReq } from "../interfaces/requestPCB";
import { formatResultCompareRes } from "../formats/formatResult";
import { calcWeight } from "../services/costCalculatorUtil";
//import {SHIPMENT_REFERENCES } from '../constants/shipmentPriceConstant';
import {
  calcEstimateShipmentCost,
  getRefWeightPrice,
  calcShippingAirCost,
  calcDHLCost,
  getRate,
} from "../services/shipmentCalculator";

export const getAllModelPCB = async (req: Request, res: Response) => {
  try {
    const allModel = await modelPCBModel.find().sort({ createdAt: -1 });
    if (!allModel) {
      res.status(404).json({
        success: true,
        message: "ไม่พบข้อมูลโมเดลในระบบ",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "ส่งข้อมูลโมเดลสำเร็จ",
      data: allModel,
    });
  } catch (error) {
    res.status(500).json({ message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

export const updateModePCB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    if (Array.isArray(newData.supplier) && newData.supplier.length > 0) {
      const supplierNames: string[] = newData.supplier;
      const suppliers = await SupplierModel.find({
        sup_name: { $in: supplierNames },
      });

      if (suppliers.length !== supplierNames.length) {
        const foundNames = suppliers.map((s) => s.sup_name);
        const notFound = supplierNames.filter(
          (name) => !foundNames.includes(name)
        );
        res
          .status(404)
          .json({ message: `ไม่พบซัพพลายเออร์ชื่อ: ${notFound.join(", ")}` });
      }

      newData.supplier_id = suppliers.map((s) => s._id);
    } else {
      newData.supplier_id = [];
    }
    const updated = await modelPCBModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updated) {
      res.status(404).json({
        success: false,
        message: "ไม่พบโมเดลที่ต้องการแก้ไข",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "แก้ไขข้อมูลโมเดลสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

export const deleteModelPCB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteModel = await modelPCBModel.findOneAndDelete({ _id: id });
    if (!deleteModel) {
      res.status(404).json({
        success: false,
        message: "ไม่พบโมเดล",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "ลบโมเดลสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

export const createPCB = async (req: Request, res: Response) => {
  try {
    const pcbData = req.body;
    const supplierName = pcbData.supplier;
    // const supplierID = await SupplierModel.findOne({ sup_name: supplierName });

    // if (!supplierID) {
    //     res.status(404).json({ message: `Supplier ${supplierName} not found` });
    //     return;
    // }

    // pcbData.supplier_id = supplierID;
    if (!pcbData) {
      res.status(400).json({
        success: false,
        message: "ไม่พบข้อมูลโมเดลที่ต้องการบันทึก",
      });
    }
    const newPCB = new modelPCBModel(pcbData);
    const savedPCB = await newPCB.save();

    res.status(201).json({
      success: true,
      message: "บันทึกข้อมูลโมเดลสำเร็จ",
    });
  } catch (error) {
    console.error("Error creating PCB:", error);
    res.status(500).json({
      success: false,
      message: "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
    });
  }
};

//for future
export const getAllPCB = async (req: Request, res: Response) => {
  try {
    const allData: IPCBinDB[] = await PCBModel.find();

    if (!allData || allData.length === 0) {
      res.status(404).json({
        success: false,
        message: "Can not find PCB data",
      });
    }

    type ModelInfo = {
      suppliers: Set<string>;
      material?: object;
      solder_mask?: string;
      legend_silk_screen?: string;
      process?: string;
    };

    const modelMap: Record<string, ModelInfo> = {};

    allData.forEach((item: IPCBinDB) => {
      const model_name = item.model_name as string;
      const supplier = item.supplier as string;
      const material = item.material;
      const solder_mask = item.solder_mask;
      const legend_silk_screen = item.legend_silk_screen;
      const process = item.process;

      if (!modelMap[model_name]) {
        // เจอครั้งแรก
        modelMap[model_name] = {
          suppliers: new Set([supplier]),
          material,
          solder_mask,
          legend_silk_screen,
          process,
        };
      } else {
        // มีอยู่แล้ว เพิ่ม supplier เข้าไป
        modelMap[model_name].suppliers.add(supplier); // ✅ ถูกต้องแล้ว
      }
    });

    const result = Object.entries(modelMap).map(([model_name, info]) => ({
      model_name,
      supplier: Array.from(info.suppliers),
      material: info.material,
      solder_mask: info.solder_mask,
      legend_silk_screen: info.legend_silk_screen,
      process: info.process,
    }));

    res.status(200).json({
      success: true,
      total_unique_models: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching PCB data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//that it for show model
export const getModelPCB = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const modelName = req.query.model_name as string;
    const supplierName = req.query.supplier_name as string;

    if (!modelName || !supplierName) {
      res.status(400).json({ message: "Missing model_name or supplier_name" });
      return;
    }

    const pcb = await PCBModel.findOne({
      model_name: modelName,
      supplier: supplierName,
    });

    if (!pcb) {
      res.status(404).json({ message: "PCB not found for this supplier" });
      return;
    }

    //console.log('pcb', pcb);
    const {
      material,
      pcb_size_mm,
      panel_size_mm,
      fix_cost,
      variable_cost,
      model_name,
      supplier,
      cavity_up,
      solder_mask,
      legend_silk_screen,
      quantity,
      process,
    } = pcb;

    res.json({
      model_name,
      supplier,
      material,
      pcb_size_mm,
      panel_size_mm,
      cavity_up,
      quantity,
      solder_mask,
      legend_silk_screen,
      process,
      fix_cost,
      variable_cost,
    });
  } catch (error) {
    console.error("Error fetching PCB:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const calculateCost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allData = req.body;
    if (!allData) {
      res.status(400).json({ message: "Missing model PCB data!" });
      return;
    }

    let result: any = 0;
    const models = (await PCBModel.find({
      model_name: allData.model_name,
      supplier: allData.sup_name,
    })) as IPCBinDB[];
    if (!allData.model_name || !allData.sup_name) {
      // result = calculatePCBCostFromBasePrice({ ...allData, models });
      result = await calculatePCBCostFromAITrainModel({ ...allData });
      // console.log(result);
      // console.log("basePrice");
    } else {
      result = calculatePCBCost({ ...allData, models });
      console.log("InDB");
    }

    res.status(200).json({
      message: "calculate cost pcb",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get cost", error });
  }
};

export const calculateSellingPrice = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(400).json({ message: "Missing model PCB data!" });
      return;
    }
    const { prices, profits } = calculatePCBPrice(data);
    res.status(200).json({
      prices,
      profits,
      // admin_fee:{
      //     total_admin_fee: parseFloat(total_admin_fee.toFixed(2)),
      //     admin_fee_per_pcb: parseFloat(admin_fee_per_pcb.toFixed(2)),
      //     sample_size
      // }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get selling price", error });
  }
};

export const getModelNameFromSup = async (req: Request, res: Response) => {
  try {
    const { sup_name } = req.query;
    if (!sup_name || typeof sup_name !== "string") {
      res.status(400).json({ message: "Missing or invalid supplier name" });
      return;
    }
    const modelNames = await PCBModel.find({ supplier: sup_name }).distinct(
      "model_name"
    );
    res.status(200).json({ modelNames });
  } catch (error) {
    res.status(500).json({ message: "Failed to get model names", error });
  }
};

export const comparePriceFromSup = async (req: Request, res: Response) => {
  try {
    const allData = req.body;

    if (!allData || !allData.data) {
      res.status(400).json({
        success: false,
        message: "Missing data to calculate",
      });
      return;
    }
    const { data } = allData;

    if (data.model_name === "") {
      const results: IResultCompareArray[] = await comparePriceFromAIpredict(
        allData
      );
      const response: IResultCompare = {
        success: true,
        message: "Send data to compare successfully",
        model_name: allData.data.model_name,
        results: results.map((r) => ({ ...r, spec_model: allData.data })),
      };

      res.status(200).json(formatResultCompareRes(response));

      return;
    }
    const modelRecords = await PCBModel.find({ model_name: data.model_name });
    if (modelRecords.length === 0) {
      res.status(404).json({
        success: false,
        message: "No models found for this name",
      });
      return;
    }

    const results: IResultCompareArray[] = [];
    for (const record of modelRecords) {
      const calculatedCost = calculatePCBCost({
        ...data,
        models: [record],
      });

      //console.table(calculatedCost);

      const input = {
        cost_per_piece: calculatedCost.all_cost_per_pcb ?? 0,
        //admin_fee: allData.admin_fee,
        margin_percent: allData.margin_percent ?? 0,
        quantity: allData.data.quantity ?? 0,
        all_total_cost: calculatedCost.all_total_cost ?? 0,
        area_in2_per_pcb: allData.area_in2_per_pcb ?? 0,
      };
      const calculatedPrice = calculatePCBPrice(input);
      results.push({
        supplier: record.supplier as string,
        model_name: record.model_name as string,
        margin_percent: allData.margin_percent ?? 0,
        cost: calculatedCost,
        price: calculatedPrice,
        spec_model: data,
      });
    }
    console.log(results);
    const response: IResultCompare = {
      success: true,
      message: "Send data to compare successfully",
      model_name: allData.data.model_name,
      results: results,
    };

    res.status(200).json(formatResultCompareRes(response));
  } catch (error) {
    console.error("comparePriceFromSup error:", error);
    res
      .status(500)
      .json({ message: "Failed to get data of compare price from sup", error });
  }
};
export const comparePriceFromAIpredict = async (
  data: any
): Promise<IResultCompareArray[]> => {
  try {
    const suppliers = await SupplierModel.find();
    const results: IResultCompareArray[] = [];
    console.log("data", data);
    for (const supplier of suppliers) {
      // Prepare input for cost calculation
      const costInput = {
        ...data?.data,
        sup_name: supplier.sup_name,
      };
      const calculatedCost = await calculatePCBCostFromAITrainModel(costInput);

      const priceInput = {
        cost_per_piece: calculatedCost.all_cost_per_pcb ?? 0,
        margin_percent: data.margin_percent ?? 0,
        quantity: data.data.quantity ?? 0,
        all_total_cost: calculatedCost.all_total_cost ?? 0,
        area_in2_per_pcb: calculatedCost.area_in2_per_pcb ?? 0,
      };
      const calculatedPrice = calculatePCBPrice(priceInput);

      results.push({
        supplier: supplier.sup_name as string,
        model_name: (data.model_name as string) ?? "",
        margin_percent: data.margin_percent ?? 0,
        cost: calculatedCost,
        price: calculatedPrice,
        spec_model: data.data,
      });
    }

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const calcShipmentCost = async (req: Request, res: Response) => {
  try {
    const data: IShipmentCostReq = req.body;
    if (!data) {
      res.status(400).json({ message: "Missing data" });
      return;
    }
    const { panel_size, shipment_cost, supplier } = data;
    const { width, height } = panel_size;
    const { shipping_type, shipping_method } = shipment_cost;
    const weight = calcWeight(width, height, data.cavity_up, data.quantity);
    const refPrice = getRefWeightPrice(
      weight,
      shipping_type,
      shipping_method,
      supplier
    );

    let shipment = 0;
    let rateChange = 0;
    if (shipping_type == "Shipping") {
      shipment = calcShippingAirCost(weight);
      rateChange = getRate(weight);
    } else if (shipping_type == "DHL") {
      shipment = calcDHLCost(weight);
    } else {
      shipment = calcEstimateShipmentCost(weight, refPrice, supplier);
    }

    console.log("refPrice", refPrice);
    console.log(
      "Argument for find refPrice: ",
      shipping_type,
      shipping_method,
      supplier
    );
    console.log("shipment", shipment);
    console.log("rateChange", rateChange);
    //const shipmentCost = calcEstimateShipmentCost(weight, refPrice, supplier);
    res.status(200).json({
      success: true,
      message: "send shipment cost successfully",
      data: {
        weight,
        shipment,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
