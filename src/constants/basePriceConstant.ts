// priceConstants.ts
import {
    Category,
    MaterialItem,
    LayerItem,
    CopperWeightItem,
    SurfaceFinishItem,
    SolderMaskItem,
    SilkscreenItem,
    ProcessItem,
    ThicknessItem
} from "../enums/materialEnum";

export interface PriceReference {
    category: Category;
    item: string;
    unit: string;
    averagePrice: number;
}

export const PCB_COST_REFERENCES: PriceReference[] = [
    // Material Prices
    {
        category: Category.MATERIAL,
        item: MaterialItem.FR4,
        unit: "USD/in²",
        averagePrice: 0.00,
    },
    {
        category: Category.MATERIAL,
        item: MaterialItem.ALUMINUM,
        unit: "USD/in²",
        averagePrice: 8.00/1550,
    },
    {
        category: Category.MATERIAL,
        item: MaterialItem.COPPER_BASE,
        unit: "USD/in²",
        averagePrice: 12.00/1550,
    },
    {
        category: Category.MATERIAL,
        item: MaterialItem.FLEX,
        unit: "USD/in²",
        averagePrice: 20.00/1550,
    },
    {
        category: Category.MATERIAL,
        item: MaterialItem.ROGERS,
        unit: "USD/in²",
        averagePrice: 25.00/1550,
    },
    {
        category: Category.MATERIAL,
        item: MaterialItem.CERAMIC,
        unit: "USD/in²",
        averagePrice: 30.00/1550,
    },

    // Layer Prices
    {
        category: Category.LAYER,
        item: LayerItem.LAYER1,
        unit: "USD/in²",
        averagePrice: -2.00/1550,
    },
    {
        category: Category.LAYER,
        item: LayerItem.LAYER2,
        unit: "USD/in²",
        averagePrice: 0.00,
    },
    {
        category: Category.LAYER,
        item: LayerItem.LAYER4,
        unit: "USD/in²",
        averagePrice: 10.00/1550,
    },
    {
        category: Category.LAYER,
        item: LayerItem.LAYER6,
        unit: "USD/in²",
        averagePrice: 18.00/1550,
    },
    {
        category: Category.LAYER,
        item: LayerItem.LAYER8,
        unit: "USD/in²",
        averagePrice: 25.00/1550,
    },
    {
        category: Category.LAYER,
        item: LayerItem.LAYER10,
        unit: "USD/in²",
        averagePrice: 35.00/1550,
    },


    // Copper Weight
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.HALF_OZ,
        unit: "USD/in²",
        averagePrice: 3.25 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.ONE_OZ,
        unit: "USD/in²",
        averagePrice: 6.5 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.TWO_OZ,
        unit: "USD/in²",
        averagePrice: 13 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.THREE_OZ,
        unit: "USD/in²",
        averagePrice: 19.5 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.FOUR_OZ,
        unit: "USD/in²",
        averagePrice: 26 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.FIVE_OZ,
        unit: "USD/in²",
        averagePrice: 32.5 / 1550,
    },
    {
        category: Category.COPPER_WEIGHT,
        item: CopperWeightItem.SIX_OZ,
        unit: "USD/in²",
        averagePrice: 39 / 1550,
    },

    // Surface Finish
    {
        category: Category.SURFACE_FINISH,
        item: SurfaceFinishItem.HASL,
        unit: "USD/in²",
        averagePrice: 20 / 1550,
    },
    {
        category: Category.SURFACE_FINISH,
        item: SurfaceFinishItem.HASL_LF,
        unit: "USD/in²",
        averagePrice: 27.5 / 1550,
    },
    {
        category: Category.SURFACE_FINISH,
        item: SurfaceFinishItem.ENIG,
        unit: "USD/in²",
        averagePrice:  50/ 1550, //140
    },

    // Solder Mask
    {
        category: Category.SOLDER_MASK,
        item: SolderMaskItem.GREEN,
        unit: "USD/in²",
        averagePrice: 0,
    },
    {
        category: Category.SOLDER_MASK,
        item: SolderMaskItem.OTHER_COLORS,
        unit: "USD/in²",
        averagePrice: 7.5 / 1550,
    },

    // Silkscreen
    {
        category: Category.SILKSCREEN,
        item: SilkscreenItem.WHITE,
        unit: "USD/in²",
        averagePrice: 0,
    },
    {
        category: Category.SILKSCREEN,
        item: SilkscreenItem.OTHER_COLORS,
        unit: "USD/in²",
        averagePrice: 7.5 / 1550,
    },

    // Thickness
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_0_6,
        unit: "USD/in²",
        averagePrice: 8.00/1550,
    },
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_0_8,
        unit: "USD/in²",
        averagePrice: 5.00/1550,
    },
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_1_0,
        unit: "USD/in²",
        averagePrice: 3.00/1550,
    },
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_1_2,
        unit: "USD/in²",
        averagePrice: 2.00/1550,
    },
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_1_6,
        unit: "USD/in²",
        averagePrice: 0.00,
    },
    {
        category: Category.THICKNESS,
        item: ThicknessItem.MM_2_0,
        unit: "USD/in²",
        averagePrice: 4.00/1550,
    },

    // Process
    {
        category: Category.PROCESS,
        item: ProcessItem.CNC_ROUTING,
        unit: "USD/in²",
        averagePrice: 35 / 1550,
    },
    {
        category: Category.PROCESS,
        item: ProcessItem.V_CUT,
        unit: "USD/in²",
        averagePrice: 10 / 1550,
    },
    {
        category: Category.PROCESS,
        item: ProcessItem.NO_X_OUT,
        unit: "USD/in²",
        averagePrice: 7.5 / 1550,
    },
    {
        category: Category.PROCESS,
        item: ProcessItem.E_TEST,
        unit: "USD/in²",
        averagePrice: 20 / 1550,
    },


];
