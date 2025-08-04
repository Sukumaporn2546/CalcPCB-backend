// === utils/pcbCostCalculator.ts ===
import { IPCBinDB } from "../interfaces/model";
import { ICost } from "../interfaces/resultCompare";
import {
  Category,
  MaterialItem,
  CopperWeightItem,
  SurfaceFinishItem,
  SolderMaskItem,
  SilkscreenItem,
} from "../enums/materialEnum";
import {
  findSampleSize,
  findTimePerSize,
  calcTimeAQL,
  calcCostAdminFee,
} from "./adminCalculatorUtil";
import { PCB_COST_REFERENCES } from "../constants/basePriceConstant";
import { calcCostFromSupAndAdmin } from "./costCalculatorUtil";
import {
  calcBoardArea,
  calcMaterialCost,
  calcTotalMaterialCost,
  calcAllCostPerPCB,
  calcAllTotalCost,
  calcWeight,
} from "./costCalculatorUtil";
import { predictPCBCost } from "./api/predictPCBCostWithAI";

interface ICalculateCostInput {
  panel_size: { width: number; height: number };
  pcb_size: { width: number; height: number };
  cavity_up: number;
  quantity: number;
  model_name: string;
  material: { copper_weight: string; surface_finish: string; layers: string };
  solder_mask: string;
  legend_silk_screen: string;
  fix_cost: { setup_cost: number; tooling: number };
  variable_cost: {
    fixture_charge: number;
    express_cost: number;
    handling: number;
    fly_probe: number;
    shipment_cost: { shipping_cost: number };
  };
  models: IPCBinDB[];
  exchange_rate: number;
}
export interface ICalculateCostBasePriceInput {
  panel_size: { width: number; height: number };
  pcb_size: { width: number; height: number };
  cavity_up: number;
  quantity: number;
  model_name: string;
  material: {
    copper_weight: string;
    surface_finish: string;
    layers: string;
    base_material: string;
    thickness: string;
  };
  solder_mask: string;
  legend_silk_screen: string;
  process: {
    CNC_Routing: string;
    V_Cut: string;
    No_X_Out: string;
    E_Test: string;
  };
  fix_cost: { setup_cost: number; tooling: number };
  variable_cost: {
    fixture_charge: number;
    express_cost: number;
    handling: number;
    fly_probe: number;
    shipment_cost: { shipping_cost: number };
  };
  exchange_rate: number;
  sup_name?: string;
}

export function calculatePCBCost(data: ICalculateCostInput): ICost {
  const {
    panel_size,
    quantity,
    cavity_up,
    pcb_size,
    model_name,
    material,
    fix_cost,
    variable_cost,
    models,
    exchange_rate,
  } = data;

  const { width: width_panel, height: height_panel } = panel_size;
  const { copper_weight } = material;
  const { setup_cost, tooling } = fix_cost;
  const { fixture_charge, express_cost, handling, fly_probe, shipment_cost } =
    variable_cost;

  const areaIn2 = calcBoardArea(width_panel, height_panel, cavity_up);

  let price = 0;
  let selected;
  console.log("DEBUG:", { cavity_up, copper_weight, quantity });
  if (models.length <= 1 && models[0]) {
    const model = models[0];
    const many = model.cost_in2_many;

    if (many) {
      switch (model.model_name) {
        case "PCB DSP-INPUT":
        case "PCB DSP-MAIN":
        case "PCB DISPLAY":
          price = quantity <= 300 ? many.q300 ?? 0 : many.q1000 ?? 0;
          break;
        case "PCB SW-SPACER":
          price = quantity <= 600 ? many.q600 ?? 0 : many.q2000 ?? 0;
          break;
        case "PCB CCA1181":
          if (quantity <= 1500) price = many.q1500 ?? 0;
          else if (quantity <= 3000) price = many.q3000 ?? 0;
          else if (quantity <= 4000) price = many.q4000 ?? 0;
          else if (quantity <= 5000) price = many.q5000 ?? 0;
          else price = many.q6000 ?? 0;
          break;
        default:
          price = model.cost_in2 ?? 0;
          break;
      }
    } else {
      price = model.cost_in2 ?? 0;
    }
  } else {
    // Logic หลาย supplier
    if (cavity_up == 1 && parseFloat(copper_weight) > 1) {
      selected = models.find(
        (m) =>
          m.cavity_up === 1 && parseFloat(m.material?.copper_weight || "0") > 1
      );
      price = selected?.cost_in2 ?? 0;
    } else if (cavity_up == 3) {
      selected = models.find((m) => m.cavity_up === 3);
      price =
        quantity <= 1500
          ? selected?.cost_in2_many?.q1500 ?? 0
          : selected?.cost_in2_many?.q3000 ?? 0;
    } else if (cavity_up == 1 && parseFloat(copper_weight) <= 1) {
      selected = models.find((m) => m._id == "6870dec41a8ea6e70b507c18");
      price =
        quantity <= 1500
          ? selected?.cost_in2_many?.q1500 ?? 0
          : selected?.cost_in2_many?.q3000 ?? 0;
    }
  }

  console.log('price: ', price, areaIn2, exchange_rate);
  const cost = calcMaterialCost(price, areaIn2, exchange_rate);  
  console.log('costInPCBCostService', cost)                                                                   
  const totalCost = calcTotalMaterialCost(cost, quantity);
  const allCostPerPCB = calcAllCostPerPCB(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost,
    quantity
  );
  const allTotalCost = calcAllTotalCost(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost
  );
  const weight = calcWeight(width_panel, height_panel, cavity_up, quantity);
  const shipmentPerPCB = shipment_cost.shipping_cost / quantity;

  const sampleSize = findSampleSize(quantity);
  const timePerSize = findTimePerSize(areaIn2);
  const timeAQL = calcTimeAQL(sampleSize, timePerSize);

  const admin_fee = calcCostAdminFee(timeAQL, sampleSize);
  const realCost = calcCostFromSupAndAdmin(
    allCostPerPCB,
    allTotalCost,
    admin_fee.admin_fee_per_pcb,
    admin_fee.total_admin_fee,
    quantity
  );

  return {
    cost_usd: price,
    cost_per_pcb: cost,
    area_in2_per_pcb: Number(areaIn2.toFixed(2)),
    total_cost: totalCost,
    all_cost_per_pcb: allCostPerPCB,
    all_total_cost: allTotalCost,
    weight_kg: weight,
    fix_cost,
    variable_cost,
    quantity,
    shipment_per_pcb: shipmentPerPCB,
    admin_fee_cost: admin_fee,
    real_cost: realCost,
    exchange_rate: exchange_rate,
  };
}

export function calculatePCBCostFromBasePrice(
  data: ICalculateCostBasePriceInput
) {
  const {
    panel_size,
    quantity,
    cavity_up,
    material,
    fix_cost,
    variable_cost,
    solder_mask,
    legend_silk_screen,
    process,
    exchange_rate,
  } = data;

  const { width: width_panel, height: height_panel } = panel_size;
  const { setup_cost, tooling } = fix_cost;
  const { fixture_charge, express_cost, handling, fly_probe, shipment_cost } =
    variable_cost;

  const areaIn2 = calcBoardArea(width_panel, height_panel, cavity_up);

  // Helper function: ดึงราคาจาก constant ตามหมวดหมู่ + รายการ
  function getAveragePrice(category: Category, item: string): number {
    const ref = PCB_COST_REFERENCES.find(
      (ref) => ref.category === category && ref.item === item
    );
    return ref?.averagePrice ?? 0;
  }

  const baseMaterialPrice = getAveragePrice(
    Category.MATERIAL,
    material.base_material
  );
  const layerPrice = getAveragePrice(Category.LAYER, material.layers);
  const copperWeightPrice = getAveragePrice(
    Category.COPPER_WEIGHT,
    material.copper_weight
  );
  const surfaceFinishPrice = getAveragePrice(
    Category.SURFACE_FINISH,
    material.surface_finish
  );

  const solderMaskItem =
    solder_mask === "green"
      ? SolderMaskItem.GREEN
      : SolderMaskItem.OTHER_COLORS;
  const solderMaskPrice = getAveragePrice(Category.SOLDER_MASK, solderMaskItem);

  const silkscreenItem =
    legend_silk_screen === "white"
      ? SilkscreenItem.WHITE
      : SilkscreenItem.OTHER_COLORS;
  const silkscreenPrice = getAveragePrice(Category.SILKSCREEN, silkscreenItem);

  const thicknessPrice = getAveragePrice(
    Category.THICKNESS,
    material.thickness
  );

  let processPrices = 0;

  if (Array.isArray(process)) {
    process.forEach((processItem) => {
      processPrices += getAveragePrice(Category.PROCESS, processItem);
    });
  }

  // const CNCPrice = getAveragePrice(Category.PROCESS, process.CNC_Routing);
  // const vCutPrice = getAveragePrice(Category.PROCESS, process.V_Cut);
  // const noXOutPrice = getAveragePrice(Category.PROCESS, process.No_X_Out);
  // const eTestPrice = getAveragePrice(Category.PROCESS, process.E_Test);
  // console.log("📦 Base Material Price:", baseMaterialPrice);
  // console.log("📄 Layer Price:", layerPrice);
  // console.log("⚖️ Copper Weight Price:", copperWeightPrice);
  // console.log("✨ Surface Finish Price:", surfaceFinishPrice);
  // console.log("🟢 Solder Mask Price:", solderMaskPrice);
  // console.log("🔤 Silkscreen Price:", silkscreenPrice);
  // console.log("📏 Thickness Price:", thicknessPrice);
  // console.log("🛠️ CNC Routing Price:", CNCPrice);
  // console.log("✂️ V-Cut Price:", VCutPrice);
  // console.log("❌ No X-Out Price:", NoXOutPrice);
  // console.log("🔍 E-Test Price:", ETestPrice);
  // console.log('------------------------')
  // console.log('cnc', process.CNC_Routing);
  // console.log('noXOut', process.No_X_Out);
  // console.log("🔧 CNC Routing Item:", process.CNC_Routing);
  // console.log("🔍 Comparing with:", Category.PROCESS, process.CNC_Routing);

  console.log("proPrice", processPrices);

  const totalPricePerSqInch =
    baseMaterialPrice +
    layerPrice +
    copperWeightPrice +
    surfaceFinishPrice +
    solderMaskPrice +
    silkscreenPrice +
    thicknessPrice +
    processPrices;

  const cost = calcMaterialCost(totalPricePerSqInch, areaIn2, exchange_rate);
  const totalCost = calcTotalMaterialCost(cost, quantity);
  const allCostPerPCB = calcAllCostPerPCB(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost,
    quantity
  );
  const allTotalCost = calcAllTotalCost(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost
  );
  const weight = calcWeight(width_panel, height_panel, cavity_up, quantity);
  const shipmentPerPCB = shipment_cost.shipping_cost / quantity;

  const sampleSize = findSampleSize(quantity);
  const timePerSize = findTimePerSize(areaIn2);
  const timeAQL = calcTimeAQL(sampleSize, timePerSize);

  const admin_fee = calcCostAdminFee(timeAQL, sampleSize);
  const realCost = calcCostFromSupAndAdmin(
    allCostPerPCB,
    allTotalCost,
    admin_fee.admin_fee_per_pcb,
    admin_fee.total_admin_fee,
    quantity
  );

  return {
    cost_usd: totalPricePerSqInch,
    cost_per_pcb: cost,
    area_in2_per_pcb: Number(areaIn2.toFixed(2)),
    total_cost: totalCost,
    all_cost_per_pcb: allCostPerPCB,
    all_total_cost: allTotalCost,
    weight_kg: weight,
    fix_cost,
    variable_cost,
    quantity,
    shipment_per_pcb: shipmentPerPCB,
    admin_fee_cost: admin_fee,
    real_cost: realCost,
    exchange_rate: exchange_rate,
  };
}
export async function calculatePCBCostFromAITrainModel(
  data: ICalculateCostBasePriceInput
) {
  const {
    pcb_size,
    panel_size,
    quantity,
    cavity_up,
    material,
    fix_cost,
    variable_cost,
    solder_mask,
    legend_silk_screen,
    process,
    exchange_rate,
    sup_name,
  } = data;

  const { width: width_panel, height: height_panel } = panel_size;
  const { width: width_pcb, height: height_pcb } = pcb_size;
  const { copper_weight, surface_finish, layers, base_material, thickness } =
    material;
  const { setup_cost, tooling } = fix_cost;
  const { fixture_charge, express_cost, handling, fly_probe, shipment_cost } =
    variable_cost;

  const areaIn2 = calcBoardArea(width_panel, height_panel, cavity_up);
  const aiInput = {
    supplier: sup_name ?? "", // string
    layers: Number(layers), // int
    base_material: base_material ?? "", // string
    thickness: `${thickness} (+/- 10% MM)`, // string
    finish_copper: copper_weight ?? "", // string
    surface_finish: surface_finish ?? "", // string
    process: Object.values(process).join(",") ?? "", // string
    silk_screen: legend_silk_screen ?? "", // string
    pcb_width: Number(width_pcb), // float
    pcb_high: Number(height_pcb), // float
    panel_width: Number(width_panel), // float
    panel_high: Number(height_panel), // float
    cavity_up: Number(cavity_up), // int
    solder_mask: solder_mask ?? "", // string
    pcb_quantity: Number(quantity), // int
  };

  const aiPredictedCost = await predictPCBCost(aiInput); // ← float USD ต่อแผ่น
  console.log("aiPredictedCOst: ", aiPredictedCost);
  const cost = Number((aiPredictedCost * exchange_rate).toFixed(4)); // แปลงเป็นบาท
  const totalCost = calcTotalMaterialCost(cost, quantity);

  const allCostPerPCB = calcAllCostPerPCB(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost,
    quantity
  );

  const allTotalCost = calcAllTotalCost(
    fixture_charge,
    express_cost,
    handling,
    fly_probe,
    shipment_cost.shipping_cost,
    setup_cost,
    tooling,
    totalCost
  );

  const weight = calcWeight(width_panel, height_panel, cavity_up, quantity);
  const shipmentPerPCB = shipment_cost.shipping_cost / quantity;

  const sampleSize = findSampleSize(quantity);
  const timePerSize = findTimePerSize(areaIn2);
  const timeAQL = calcTimeAQL(sampleSize, timePerSize);

  const admin_fee = calcCostAdminFee(timeAQL, sampleSize);
  const realCost = calcCostFromSupAndAdmin(
    allCostPerPCB,
    allTotalCost,
    admin_fee.admin_fee_per_pcb,
    admin_fee.total_admin_fee,
    quantity
  );

  return {
    cost_usd: aiPredictedCost,
    cost_per_pcb: cost,
    area_in2_per_pcb: Number(areaIn2.toFixed(2)),
    total_cost: totalCost,
    all_cost_per_pcb: allCostPerPCB,
    all_total_cost: allTotalCost,
    weight_kg: weight,
    fix_cost,
    variable_cost,
    quantity,
    shipment_per_pcb: shipmentPerPCB,
    admin_fee_cost: admin_fee,
    real_cost: realCost,
    exchange_rate: exchange_rate,
  };
}
