/**
 * @swagger
 * /api/calculatePCB/:
 *   get:
 *     summary: Get all unique PCB models and their supplier information
 *     tags:
 *       - PCB
 *     responses:
 *       200:
 *         description: ส่งข้อมูลโมเดลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: send model successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6881b844543eb303ef663d0c
 *                       model_name:
 *                         type: string
 *                         example: PCB COCO ELSD LN Control
 *                       supplier:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       supplier_id:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *                       material:
 *                         type: object
 *                         properties:
 *                           layers:
 *                             type: string
 *                             example: "2"
 *                           base_material:
 *                             type: string
 *                             example: FR-4
 *                           thickness:
 *                             type: string
 *                             example: 1.2 mm
 *                           copper_weight:
 *                             type: string
 *                             example: 1 OZ
 *                           surface_finish:
 *                             type: string
 *                             example: HASL LF
 *                       pcb_size_mm:
 *                         type: object
 *                         properties:
 *                           width:
 *                             type: number
 *                             example: 53.6
 *                           height:
 *                             type: number
 *                             example: 57.55
 *                           unit:
 *                             type: string
 *                             example: mm
 *                       panel_size_mm:
 *                         type: object
 *                         properties:
 *                           width:
 *                             type: number
 *                             example: 230.05
 *                           height:
 *                             type: number
 *                             example: 130.67
 *                           unit:
 *                             type: string
 *                             example: mm
 *                       cavity_up:
 *                         type: number
 *                         example: 8
 *                       solder_mask:
 *                         type: string
 *                         example: green
 *                       legend_silk_screen:
 *                         type: string
 *                         example: white
 *                       process:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["V-Cut", "CNC", "No X-out"]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-24T04:36:20.498Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-24T04:36:20.498Z
 *                       __v:
 *                         type: number
 *                         example: 0
 *       404:
 *         description: ไม่พบข้อมูลโมเดล
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */


//have to fix this doc
/**
 * @swagger
 * /api/calculatePCB/update-model/{id}:
 *   put:
 *     summary: Update an existing Model PCB
 *     tags:
 *       - PCB
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Model PCB to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Suntop", "Sunking"]
 *               model_name:
 *                 type: string
 *                 example: PCB COCO ELSD LN Control
 *               material:
 *                 type: object
 *                 properties:
 *                   layers:
 *                     type: string
 *                     example: 2
 *                   base_material:
 *                     type: string
 *                     example: FR-4
 *                   thickness:
 *                     type: string
 *                     example: 1.2 mm
 *                   copper_weight:
 *                     type: string
 *                     example: 1 OZ
 *                   surface_finish:
 *                     type: string
 *                     example: HASL
 *               pcb_size_mm:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 99
 *                   height:
 *                     type: number
 *                     example: 60.2
 *                   unit:
 *                     type: string
 *                     example: mm
 *               panel_size_mm:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 132.4
 *                   height:
 *                     type: number
 *                     example: 140.2
 *                   unit:
 *                     type: string
 *                     example: mm
 *               cavity_up:
 *                 type: number
 *                 example: 2
 *               solder_mask:
 *                 type: string
 *                 example: green
 *               legend_silk_screen:
 *                 type: string
 *                 example: white
 *               process:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["CNC", V-Cut]
 *     responses:
 *       200:
 *         description: Updated Model successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: แก้ไขข้อมูลโมเดลสำเร็จ
 *       404:
 *         description: ไม่พบโมเดลที่ต้องการแก้ไข
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/calculatePCB/del/{id}:
 *   delete:
 *     summary: Delete a PCB model by ID
 *     tags:
 *       - PCB
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the model to delete
 *     responses:
 *       200:
 *         description: Model deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ลบโมเดลสำเร็จ
 *       404:
 *         description: Model not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบโมเดล
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */


/**
 * @swagger
 * /api/calculatePCB/pcb:
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


/**
 * @swagger
 * /api/calculatePCB/model-name:
 *   get:
 *     summary: Get model names from specific supplier
 *     tags:
 *       - PCB
 *     parameters:
 *       - in: query
 *         name: sup_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier name to filter model names
 *         example: Suntop
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
 *                   example: [ "PCB CCA1181", "PCB COCO ELSD LN Control" ]
 *       400:
 *         description: Missing or invalid supplier name
 *       500:
 *         description: Failed to get model names
 */


/**
 * @swagger
 * /api/calculatePCB/create-pcb:
 *   post:
 *     summary: Create a new PCB record
 *     tags:
 *       - PCB
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_name:
 *                 type: string
 *                 example: test
 *               supplier:
 *                 type: string
 *                 example: Intech
 *               material:
 *                 type: object
 *                 properties:
 *                   layers:
 *                     type: string
 *                     example: "2"
 *                   base_material:
 *                     type: string
 *                     example: FR-4
 *                   thickness:
 *                     type: string
 *                     example: 1.2 mm
 *                   copper_weight:
 *                     type: string
 *                     example: 1/1Oz
 *                   surface_finish:
 *                     type: string
 *                     example: HASL LF
 *               pcb_size_mm:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 53.52
 *                   height:
 *                     type: number
 *                     example: 57.51
 *               panel_size_mm:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 230.02
 *                   height:
 *                     type: number
 *                     example: 130.66
 *               cavity_up:
 *                 type: integer
 *                 example: 8
 *               solder_mask:
 *                 type: string
 *                 example: green
 *               legend_silk_screen:
 *                 type: string
 *                 example: white
 *               process:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["V-Cut", "CNC", "No X-out"]
 *     responses:
 *       201:
 *         description: PCB created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: บันทึกข้อมูลโมเดลสำเร็จ
 *       400:
 *         description: ไม่พบข้อมูลที่ต้องการบันทึก
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

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
 *                 example: PCB COCO ELSD LN Control
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
 *                   base_material:
 *                     type: string
 *                     example: FR-4
 *                   layers:
 *                     type: string
 *                     example: 2
 *                   thickness:
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
 *               process:
 *                 type: object
 *                 properties:
 *                   CNC_Routing:
 *                     type: string
 *                     example: CNC
 *                   V_Cut:
 *                     type: string
 *                     example: V-Cut
 *                   No_X_Out:
 *                     type: string
 *                     example: No X-Out
 *                   E_Test:
 *                     type: string
 *                     example: E-Test
 *               exchange_rate:
 *                 type: number
 *                 example: 35
 *               currency:
 *                 type: string
 *                 example: "usd" 
 *               admin_cost_percent:
 *                 type: number
 *                 example: 12
 *  
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
 *                       example: 0.09516129032258064
 *                     cost_per_pcb:
 *                       type: number
 *                       example: 62.917329502159006
 *                     area_in2_per_pcb:
 *                       type: number
 *                       example: 18.89
 *                     total_cost:
 *                       type: number
 *                       example: 125834.66
 *                     all_cost_per_pcb:
 *                       type: number
 *                       example: 78.24
 *                     all_total_cost:
 *                       type: number
 *                       example: 156484.66
 *                     weight_kg:
 *                       type: number
 *                       example: 68.25
 *                     fix_cost:
 *                       type: object
 *                       properties:
 *                         setup_cost:
 *                           type: number
 *                           example: 0
 *                         tooling:
 *                           type: number
 *                           example: 3500
 *                     variable_cost:
 *                       type: object
 *                       properties:
 *                         fixture_charge:
 *                           type: number
 *                           example: 0
 *                         express_cost:
 *                           type: number
 *                           example: 0
 *                         handling:
 *                           type: number
 *                           example: 0
 *                         fly_probe:
 *                           type: number
 *                           example: 3000
 *                         shipment_cost:
 *                           type: object
 *                           properties:
 *                             shipping_type:
 *                               type: string
 *                               example: DHL
 *                             shipping_method:
 *                               type: string
 *                               example: Air
 *                             shipping_cost:
 *                               type: number
 *                               example: 24150
 *                             combination:
 *                               type: boolean
 *                               example: true
 *                     quantity:
 *                       type: integer
 *                       example: 2000
 *                     shipment_per_pcb:
 *                       type: number
 *                       example: 12.075
 *                     admin_fee_cost:
 *                       type: object
 *                       properties:
 *                         total_admin_fee:
 *                           type: number
 *                           example: 161.2
 *                         admin_fee_per_pcb:
 *                           type: number
 *                           example: 1.29
 *                         sample_size:
 *                           type: integer
 *                           example: 125
 *                         admin_percent_of_cost_per_piece:
 *                           type: number
 *                           example: 23.98
 *                         cost_inspec_per_piece:
 *                           type: number
 *                           example: 9.881183999365161
 *                         total_cost_inspec:
 *                           type: number
 *                           example: 49405.9199968258
 *                     realCost:
 *                       type: object
 *                       properties:
 *                         cost_per_pcb:
 *                           type: number
 *                           example: 8.95
 *                         total_cost_pcb:
 *                           type: number
 *                           example: 39805.92
 *                     exchange_rate:
 *                       type: number
 *                       example: 35
 *       400:
 *         description: Missing input data
 *       500:
 *         description: Server error or calculation failed
 */

/**
 * @swagger
 * /api/calculatePCB/selling-price:
 *   post:
 *     summary: Calculate selling price, profit and admin cost
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
 *               - margin_percent
 *               - quantity
 *               - all_total_cost
 *               - are_in2_per_pcb
 *             properties:
 *               cost_per_piece:
 *                 type: number
 *                 example: 7.92
 *               margin_percent:
 *                 type: number
 *                 example: 10
 *               quantity:
 *                 type: integer
 *                 example: 5000
 *               all_total_cost:
 *                 type: number
 *                 example: 39600
 *               area_in2_per_pcb:
 *                 type: number
 *                 example: 5.18
 *     responses:
 *       200:
 *         description: Successfully calculated selling prices and profits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prices:
 *                   type: object
 *                   properties:
 *                     unitPrice:
 *                       type: number
 *                       example: 10.91
 *                     totalPrice:
 *                       type: number
 *                       example: 54550
 *                          
 *                 profits:
 *                   type: object
 *                   properties:
 *                     profitPrice:
 *                       type: number
 *                       example: 2.99
 *                     allProfitPrice:
 *                       type: number
 *                       example: 14950
 *  
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/calculatePCB/compare-price:
 *   post:
 *     summary: Compare price from different suppliers for a specific PCB model
 *     tags:
 *       - Pricing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   model_name:
 *                     type: string
 *                     example: PCB DISPLAY
 *                   sup_name:
 *                     type: string
 *                     example: Intech
 *                   material:
 *                     type: object
 *                     properties:
 *                       base_material:
 *                         type: string
 *                         example: FR-4
 *                       layers:
 *                         type: string
 *                         example: "2"
 *                       thickness:
 *                         type: string
 *                         example: 1.2 mm
 *                       copper_weight:
 *                         type: string
 *                         example: 1.00Z
 *                       surface_finish:
 *                         type: string
 *                         example: HASL LF
 *                   quantity:
 *                     type: number
 *                     example: 2000
 *                   pcb_size:
 *                     type: object
 *                     properties:
 *                       width:
 *                         type: number
 *                         example: 99.06
 *                       height:
 *                         type: number
 *                         example: 113.03
 *                       unit:
 *                         type: string
 *                         example: mm
 *                   panel_size:
 *                     type: object
 *                     properties:
 *                       width:
 *                         type: number
 *                         example: 99.06
 *                       height:
 *                         type: number
 *                         example: 123.03
 *                       unit:
 *                         type: string
 *                         example: mm
 *                   cavity_up:
 *                     type: number
 *                     example: 1
 *                   solder_mask:
 *                     type: string
 *                     example: green
 *                   legend_silk_screen:
 *                     type: string
 *                     example: white
 *                   fix_cost:
 *                     type: object
 *                     properties:
 *                       setup_cost:
 *                         type: number
 *                         example: 0
 *                       tooling:
 *                         type: number
 *                         example: 3500
 *                   variable_cost:
 *                     type: object
 *                     properties:
 *                       fixture_charge:
 *                         type: number
 *                         example: 0
 *                       express_cost:
 *                         type: number
 *                         example: 0
 *                       handling:
 *                         type: number
 *                         example: 0
 *                       fly_probe:
 *                         type: number
 *                         example: 3000
 *                       shipment_cost:
 *                         type: object
 *                         properties:
 *                           shipping_type:
 *                             type: string
 *                             example: DHL
 *                           shipping_method:
 *                             type: string
 *                             example: Air
 *                           shipping_cost:
 *                             type: number
 *                             example: 24150
 *                           combination:
 *                             type: boolean
 *                             example: true
 *               admin_fee:
 *                 type: number
 *                 example: 10
 *               margin_percent:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully calculated and compared prices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Send data to compare successfully
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       supplier:
 *                         type: string
 *                         example: Sunking
 *                       model_name:
 *                         type: string
 *                         example: PCB DISPLAY
 *                       cost:
 *                         type: object
 *                         properties:
 *                           cost_usd:
 *                             type: number
 *                             example: 0.03434623704
 *                           all_cost_per_pcb:
 *                             type: number
 *                             example: 8.9
 *                           all_total_cost:
 *                             type: number
 *                             example: 44507.24
 *                           shipment_per_pcb: 
 *                             type: number
 *                             example: 1.2
 *                           realCost:
 *                             type: object
 *                             properties:
 *                               cost_per_pcb:
 *                                 type: number
 *                                 example: 8.95
 *                               total_cost_pcb:
 *                                 type: number
 *                                 example: 39805.92
 *                       price:
 *                         type: object
 *                         properties:
 *                           realCost:
 *                             type: object
 *                             properties:
 *                               cost_per_pcb:
 *                                 type: number
 *                                 example: 15.3
 *                               total_cost_per_pcb:
 *                                 type: number
 *                                 example: 45786.44                             
 *                           prices:
 *                             type: object
 *                             properties:
 *                               unitPrice:
 *                                 type: number
 *                                 example: 59.65
 *                               totalPrice:
 *                                 type: number
 *                                 example: 119300
 *                           profits:
 *                             type: object
 *                             properties:
 *                               profitPrice:
 *                                 type: number
 *                                 example: 5.42
 *                               allProfitPrice:
 *                                 type: number
 *                                 example: 30832.57
 *       400:
 *         description: Missing required input data
 *       404:
 *         description: No model records found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/calculatePCB/shipment-cost:
 *   post:
 *     summary: Calculate shipment cost
 *     tags:
 *       - ShipmentCost
 *     description: รับข้อมูลขนาด panel และ shipment options เพื่อคำนวณค่าน้ำหนักและค่าส่ง
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 type: string
 *                 example: Suntop
 *               quantity:
 *                 type: integer
 *                 example: 10000
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
 *               cavity_up:
 *                 type: integer
 *                 example: 8
 *               shipment_cost:
 *                 type: object
 *                 properties:
 *                   shipping_type:
 *                     type: string
 *                     example: Shipping
 *                   shipping_method:
 *                     type: string
 *                     example: Air
 *                   cbm:
 *                     type: number
 *                     example: 9
 *                   rateOceanFreight:
 *                     type: number
 *                     example: 5
 *                   combination:
 *                     type: boolean
 *                     example: false
 *     responses:
 *       200:
 *         description: Shipment cost calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: send shipment cost successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     weight:
 *                       type: number
 *                       example: 105.21
 *                     shipmentCost:
 *                       type: number
 *                       example: 15000
 *       400:
 *         description: Missing or invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing data
 *       500:
 *         description: Internal server error
 */


//Supplier

/**
 * @swagger
 * /api/supplier/:
 *   get:
 *     summary: Get all suppliers
 *     tags:
 *       - Supplier
 *     responses:
 *       200:
 *         description: ส่งข้อมูลซัพพลายเออร์สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ส่งข้อมูลซัพพลายเออร์สำเร็จ
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6870b170036b5e1ffa8f5497
 *                       sup_name:
 *                         type: string
 *                         example: Intech
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-11T06:38:40.529Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-11T06:38:40.529Z
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                       models:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - PCB COCO ELSD LN Power
 *                           - PCB DSP-MAIN
 *                           - PCB DSP-INPUT
 *                           - PCB COCO ELSD LN Control
 *       200-Empty:
 *         description: ไม่พบข้อมูลซัพพลายเออร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ไม่พบข้อมูลซัพพลายเออร์
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/supplier/create:
 *   post:
 *     summary: Create a new supplier
 *     description: สร้างข้อมูลซัพพลายเออร์ใหม่
 *     tags:
 *       - Supplier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sup_name
 *             properties:
 *               sup_name:
 *                 type: string
 *                 example: New Starting
 *     responses:
 *       201:
 *         description: บันทึกข้อมูลซัพพลายเออร์สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: บันทึกข้อมูลซัพพลายเออร์สำเร็จ
 *       400:
 *         description: ไม่พบข้อมูลซัพพลายเออร์ที่ต้องการบันทึก
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบข้อมูลซัพพลายเออร์ที่ต้องการบันทึก
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/supplier/update/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     description: แก้ไขข้อมูลซัพพลายเออร์ตาม ID ที่ระบุ
 *     tags:
 *       - Supplier
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: รหัสซัพพลายเออร์ที่ต้องการแก้ไข
 *         schema:
 *           type: string
 *           example: 64f24db2acffb8421a35c13f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sup_name:
 *                 type: string
 *                 example: Updated Supplier Name
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: แก้ไขข้อมูลสำเร็จ
 *       404:
 *         description: ไม่พบซัพพลายเออร์ที่ต้องการแก้ไข
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบซัพพลายเออร์ที่ต้องการแก้ไข
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/supplier/del/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     description: ลบข้อมูลซัพพลายเออร์ตาม ID ที่ระบุ
 *     tags:
 *       - Supplier
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: รหัสของซัพพลายเออร์ที่ต้องการลบ
 *         schema:
 *           type: string
 *           example: 64f24db2acffb8421a35c13f
 *     responses:
 *       200:
 *         description: ลบข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ลบข้อมูลสำเร็จ
 *       404:
 *         description: ไม่พบซัพพลายเออร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบซัพพลายเออร์
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

//Quotation
/**
 * @swagger
 * /api/quotation/:
 *   get:
 *     summary: Get all quotation records
 *     description: ดึงข้อมูลรายการใบเสนอราคาทั้งหมดจากฐานข้อมูล
 *     tags:
 *       - Quotation
 *     responses:
 *       200:
 *         description: ส่งข้อมูลใบเสนอราคาเรียบร้อยแล้ว 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: ส่งข้อมูลสำเร็จ
 *                 data:
 *                   type: object
 *                   properties:
 *                     quotations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 687f1e43aa614a3172a66bcd
 *                           model_name:
 *                             type: string
 *                             example: Model A
 *                           supplier:
 *                             type: string
 *                             example: Suntop
 *                           cost_per_pcb:
 *                             type: number
 *                             example: 10
 *                           total_cost_pcb:
 *                             type: number
 *                             example: 0
 *                           unit_price:
 *                             type: number
 *                             example: 12
 *                           total_price:
 *                             type: number
 *                             example: 60000
 *                           profit_price:
 *                             type: number
 *                             example: 2
 *                           all_profit_price:
 *                             type: number
 *                             example: 10000
 *                           customer_name:
 *                             type: string
 *                             example: Customer A
 *                           status:
 *                             type: string
 *                             example: Pending
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-22T05:14:43.037Z
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-07-23T02:00:24.739Z
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/quotation/create:
 *   post:
 *     summary: Create a new quotation record
 *     description: สร้างรายการใบเสนอราคาลงในฐานข้อมูล
 *     tags:
 *       - Quotation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model_name
 *               - supplier
 *               - cost_per_pcb
 *               - total_cost_pcb
 *               - unit_price
 *               - total_price
 *               - profit_price
 *               - all_profit_price
 *               - customer_name
 *               - status
 *             properties:
 *               model_name:
 *                 type: string
 *                 example: Model C
 *               supplier:
 *                 type: string
 *                 example: Intech
 *               cost_per_pcb:
 *                 type: number
 *                 example: 10
 *               total_cost_pcb:
 *                 type: number
 *                 example: 0
 *               unit_price:
 *                 type: number
 *                 example: 12
 *               total_price:
 *                 type: number
 *                 example: 60000
 *               profit_price:
 *                 type: number
 *                 example: 2
 *               all_profit_price:
 *                 type: number
 *                 example: 10000
 *               customer_name:
 *                 type: string
 *                 example: Customer B
 *               status:
 *                 type: string
 *                 example: Pending
 *     responses:
 *       201:
 *         description: บันทึกใบเสนอราคาเรียบร้อยแล้ว
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: บันทึกใบสั่งซื้อสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูลที่ต้องการบันทึก หรือไม่พบซัพพลายเออร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: ไม่พบข้อมูลที่ต้องการบันทึก
 *       500:
 *         description: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/quotation/update/{id}:
 *   put:
 *     summary: Update Quotation by id
 *     tags:
 *       - Quotation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสของใบเสนอราคาที่ต้องการอัปเดต
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model_name:
 *                 type: string
 *               supplier:
 *                 type: string
 *               customer_name:
 *                 type: string
 *               cost_per_pcb:
 *                 type: number
 *               total_cost_pcb:
 *                 type: number
 *               unit_price:
 *                 type: number
 *               total_price:
 *                 type: number
 *               profit_price:
 *                 type: number
 *               all_profit_price:
 *                 type: number
 *               status:
 *                 type: string
 *             example:
 *               model_name: "Model C"
 *               supplier: "Intech"
 *               customer_name: "Customer A"
 *               cost_per_pcb: 10
 *               total_cost_pcb: 5000
 *               unit_price: 15
 *               total_price: 7500
 *               profit_price: 5
 *               all_profit_price: 2500
 *               status: "Confirmed"
 *     responses:
 *       200:
 *         description: อัปเดตข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: ไม่พบใบเสนอราคาที่ต้องการอัปเดต
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 */

/**
 * @swagger
 * /api/quotation/del/{id}:
 *   delete:
 *     summary: Delete Quotation by id
 *     tags:
 *       - Quotation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: รหัสของใบเสนอราคาที่ต้องการลบ
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ลบข้อมูลสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: ไม่พบประวัติ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: ข้อผิดพลาดภายในเซิร์ฟเวอร์
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */


/**
 * @swagger
 * /api/supplier/sup-name:
 *   get:
 *     summary: get all sup name
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: ดึงชื่อซัพพลายเออร์สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 supplierNames:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Intech", "Sunking", "Suntop"]
 *       500:
 *         description: ไม่สามารถดึงข้อมูลซัพพลายเออร์ได้
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/calculatePCB/cost-admin:
 *   post:
 *     summary: Calculate PCB cost including admin fees
 *     description: Calculate the total PCB cost per piece and overall, considering inspection cost and admin fees.
 *     tags:
 *       - Cost
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cost_inspec_per_piece:
 *                 type: number
 *                 example: 21.354509531739065
 *               total_cost_inspec:
 *                 type: number
 *                 example: 106772.54765869533
 *               quantity:
 *                 type: integer
 *                 example: 5000
 *               admin_cost_percent:
 *                 type: number
 *                 example: 12
 *               admin_fee_per_pcb:
 *                 type: number
 *                 example: 1.196
 *               total_admin_fee:
 *                 type: number
 *                 example: 239.20
 *     responses:
 *       200:
 *         description: PCB cost calculation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: send cost successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     realCost:
 *                       type: object
 *                       properties:
 *                         cost_per_pcb:
 *                           type: number
 *                           example: 23.970631475547755
 *                         total_cost_pcb:
 *                           type: number
 *                           example: 119853.15737773877
 */
