import axios from "axios";

export async function predictPCBCost(input: {
  supplier: string;
  layers: number;
  base_material: string;
  thinkness: string;
  finish_copper: string;
  surface_finish: string;
  process: string;
  silk_screen: string;
  pcb_width: number;
  pcb_high: number;
  panel_width: number;
  panel_high: number;
  cavity_up: number;
  solder_mask: string;
  pcb_quantity: number;
}): Promise<number> {
  try {
    const response = await axios.post(
      "http://172.16.16.54:8000/predict",
      input,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.predicted_cost;
  } catch (error) {
    console.error("AI prediction failed", error);
    throw new Error("AI prediction failed");
  }
}
