import express from "express";

import { getAllSup, getAllPCB, getModelPCB, createPCB, createSup, updateSup, getModelName, getSupName, calculateCost, calculateSellingPrice} from "../controller/pcbController";

const router = express.Router();
/**
 * @swagger
 * /api/calculatePCB/:
 *   get:
 *     summary: Get all PCB models
 *     tags:
 *       - PCB
 *     responses:
 *       200:
 *         description: A list of all PCB models
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   model_name:
 *                     type: string
 *                     example: PCB COCO ELSD LN CONTROL
 *                   sup_name:
 *                     type: string
 *                     example: Suntop
 *                   quantity:
 *                     type: integer
 *                     example: 5000
 *                   cost_in2:
 *                     type: number
 *                     example: 0.0295
 *       500:
 *         description: Server error
 */

router.get("/", getAllPCB);

/**
 * @swagger
 * /pcb:
 *   get:
 *     summary: Get PCB data by model name and supplier name
 *     tags:
 *       - PCB
 *     parameters:
 *       - in: query
 *         name: model_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the PCB model
 *         example: PCB COCO ELSD LN CONTROL
 *       - in: query
 *         name: supplier_name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the supplier
 *         example: Suntop
 *     responses:
 *       200:
 *         description: PCB data found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   model_name:
 *                     type: string
 *                     example: PCB COCO ELSD LN CONTROL
 *                   supplier:
 *                     type: string
 *                     example: Suntop
 *                   material:
 *                     type: object
 *                     properties:
 *                       layers:
 *                         type: string
 *                         example: "2"
 *                       base_material:
 *                         type: string
 *                         example: FR-4
 *                       thickness:
 *                         type: string
 *                         example: 1.2 mm (+/- 10% MM)
 *                       copper_weight:
 *                         type: string
 *                         example: 1/1Oz
 *                       surface_finish:
 *                         type: string
 *                         example: HASL LF
 *                   quantity:
 *                     type: integer
 *                     example: 5000
 *                   cost_usd:
 *                     type: number
 *                     example: 0.172
 *                   cost_in2:
 *                     type: number
 *                     example: 0.02953165175
 *       400:
 *         description: Missing model_name or supplier_name
 *       404:
 *         description: PCB not found for this supplier
 *       500:
 *         description: Server error
 */

router.get("/pcb", getModelPCB);
/**
 * @swagger
 * /api/calCulatePCB/sup:
 *   get:
 *     summary: Get all supplier data
 *     tags:
 *       - Supplier
 *     responses:
 *       200:
 *         description: A list of all suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6870b148036b5e1ffa8f5493
 *                   sup_name:
 *                     type: string
 *                     example: Suntop
 *                   createdAt:
 *                     type: string
 *                     example: 2025-07-11T06:38:00.226Z
 *                   updatedAt: 
 *                      type: string
 *                      example: 2025-07-11T06:38:00.226Z
 *                   __v:
 *                      type: string
 *                      example: 0
 *       500:
 *         description: Server error
 */
router.get("/sup", getAllSup);

/**
 * @swagger
 * /api/calculatePCB/model-name:
 *   get:
 *     summary: Get all unique model names from PCB data
 *     tags:
 *       - PCB
 *     responses:
 *       200:
 *         description: List of model names
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modelNames:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - PCB CCA1181
 *                     - PCB COCO ELSD LN CONTROL
 *                     - PCB COCO ELSD LN POWER
 *                     - PCB DISPLAY
 *                     - PCB DSP-INPUT
 *                     - PCB DSP-MAIN
 *                     - PCB Rinnai Aqua Control
 *                     - PCB Rinnai Aqua Power
 *                     - PCB SW-SPACER
 *                     - PR01-PD60-02A6x
 *       500:
 *         description: Failed to fetch model names
 */
router.get("/model-name", getModelName);
/**
 * @swagger
 * /sup-name:
 *   get:
 *     summary: Get all unique supplier names
 *     tags:
 *       - Supplier
 *     responses:
 *       200:
 *         description: List of supplier names
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 supplierNames:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Intech
 *                     - Sunking
 *                     - Suntop
 *       500:
 *         description: Failed to fetch supplier names
 */

router.get("/sup-name", getSupName );
/**
 * @swagger
 * /api/calculatePCB/cost:
 *   post:
 *     summary: Calculate total PCB cost
 *     tags:
 *       - Cost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_name:
 *                 type: string
 *                 example: PCB COCO ELSD LN CONTROL
 *               sup_name:
 *                 type: string
 *                 example: Suntop
 *               quantity:
 *                 type: integer
 *                 example: 5000
 *               cavity_up:
 *                 type: integer
 *                 example: 8
 *               pcb_size:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 53.6
 *                   height:
 *                     type: number
 *                     example: 57.55
 *                   unit:
 *                     type: string
 *                     example: mm
 *               panel_size:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 230.05
 *                   height:
 *                     type: number
 *                     example: 130.67
 *                   unit:
 *                     type: string
 *                     example: mm
 *               material:
 *                 type: object
 *                 properties:
 *                   base_materail:
 *                     type: string
 *                     example: FR-4
 *                   layers:
 *                     type: string
 *                     example: 2
 *                   thickeness:
 *                     type: string
 *                     example: 1.2 mm
 *                   copper_weight:
 *                     type: string
 *                     example: 1/1OZ
 *                   surface_finish:
 *                     type: string
 *                     example: HASL LF
 *               solder_mask:
 *                 type: string
 *                 example: green
 *               legend_silk_screen:
 *                 type: string
 *                 example: white
 *               fix_cost:
 *                 type: object
 *                 properties:
 *                   setup_cost:
 *                     type: number
 *                     example: 0
 *                   tooling:
 *                     type: number
 *                     example: 3500
 *               variable_cost:
 *                 type: object
 *                 properties:
 *                   fixture_charge:
 *                     type: number
 *                     example: 0
 *                   express_cost:
 *                     type: number
 *                     example: 0
 *                   handling:
 *                     type: number
 *                     example: 0
 *                   fly_probe:
 *                     type: number
 *                     example: 0
 *                   shipment_cost:
 *                     type: object
 *                     properties:
 *                       shipping_type:
 *                         type: string
 *                         example: Shipping
 *                       shipping_method:
 *                         type: string
 *                         example: Air
 *                       shipping_cost:
 *                         type: number
 *                         example: 6000
 *                       combination:
 *                         type: boolean
 *                         example: true
 *     responses:
 *       200:
 *         description: PCB cost calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: calculate cost pcb
 *                 data:
 *                   type: object
 *                   properties:
 *                     cost_usd:
 *                       type: number
 *                       example: 6.02
 *                     area_in2_per_pcb:
 *                       type: number
 *                       example: 5.82
 *                     total_cost:
 *                       type: number
 *                       example: 30100
 *                     all_cost_per_pcb:
 *                       type: number
 *                       example: 7.92
 *                     all_total_cost:
 *                       type: number
 *                       example: 39600
 *                     weight_kg:
 *                       type: number
 *                       example: 52.61
 *       400:
 *         description: Missing input data
 *       500:
 *         description: Server error or calculation failed
 */
router.post("/cost", calculateCost);
/**
 * @swagger
 * /api/calculatePCB/selling-price:
 *   post:
 *     summary: Calculate selling price per piece and total price
 *     tags:
 *       - Pricing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cost_per_piece
 *               - admin_fee
 *               - margin_percent
 *             properties:
 *               cost_per_piece:
 *                 type: number
 *                 example: 7.92
 *               admin_fee:
 *                 type: number
 *                 example: 2
 *               margin_percent:
 *                 type: number
 *                 example: 10
 *               quantity:
 *                 type: number
 *                 example: 5000
 *     responses:
 *       200:
 *         description: Successfully calculated selling price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: object
 *                   properties:
 *                     unitPrice:
 *                       type: number
 *                       example: 10.91
 *                     totalPrice:
 *                       type: number
 *                       example: 54550
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Server error
 */

router.post("/selling-price", calculateSellingPrice);
router.post("/create-pcb", createPCB);
router.post("/create-sup", createSup);
router.put("/sup/:id", updateSup); // ✅


export default router;
