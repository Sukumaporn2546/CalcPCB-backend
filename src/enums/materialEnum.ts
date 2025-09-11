// enums.ts
export enum Category {
    MATERIAL = "Material",
    LAYER = "Layer",
    COPPER_WEIGHT = "Copper Weight",
    SURFACE_FINISH = "Surface Finish",
    SOLDER_MASK = "Solder Mask",
    SILKSCREEN = "Silkscreen",
    PROCESS = "Process",
    THICKNESS = "Thickness"
}

export enum MaterialItem {
    FR4 = "FR-4",
    ALUMINUM = "Aluminum",
    COPPER_BASE = "Copper Base",
    FLEX = "FLEX",
    ROGERS = "Rogers",
    CERAMIC = "Ceramic",
}

export enum LayerItem {
    LAYER1 = "1",
    LAYER2 = "2",
    LAYER4 = "4",
    LAYER6 = "6",
    LAYER8 = "8",
    LAYER10 = "10"

}

export enum CopperWeightItem {
    HALF_OZ = "0.5 OZ",
    ONE_OZ = "1 OZ",
    TWO_OZ = "2 OZ",
    THREE_OZ = "3 OZ",
    FOUR_OZ = "4 OZ",
    FIVE_OZ = "5 OZ",
    SIX_OZ = "6 OZ"
}

export enum SurfaceFinishItem {
    HASL_LF = "HASL LF",
    ENIG = "ENIG",
    HASL = "HASL"
}

export enum SolderMaskItem {
    GREEN = "Green (default)",
    OTHER_COLORS = "Other colors",
}

export enum SilkscreenItem {
    WHITE = "White (default)",
    OTHER_COLORS = "Other colors",
}

export enum ThicknessItem {
    MM_0_4 = "0.4 mm",
    MM_0_6 = "0.6 mm",
    MM_0_8 = "0.8 mm",
    MM_1_0 = "1.0 mm",
    MM_1_2 = "1.2 mm",
    MM_1_6 = "1.6 mm",
    MM_2_0 = "2.0 mm",
}

export enum ProcessItem {
    CNC_ROUTING = "CNC",
    V_CUT = "V-Cut",
    NO_X_OUT = "No X-Out",
    E_TEST = "E-Test"
}



