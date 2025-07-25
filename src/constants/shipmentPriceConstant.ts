import {
    Category,
    SupplierItem,
    ShippingTypeItem,
    ShippingMethodItem
} from '../enums/shipmentEnum'

export interface IShipmentPrice {
    supplier: string
    type: string;
    weight: number;
    unit: string;
    price: number;
    method: string;
}

export const SHIPMENT_REFERENCES: IShipmentPrice[] = [
    //shipping air suntop
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 114,
        price: 16746.5 / 114,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 142,
        price: 24398.41 / 142,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 257,
        price: 24244.9 / 257,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 400,
        price: 34454.5 / 400,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 600,
        price: 36038.5 / 600,
        method: ShippingMethodItem.AIR
    },

    //Fedx suntop
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 21,
        price: 3.3 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 100,
        price: 3 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNTOP,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 300,
        price: 2.6 * 35,
        method: ShippingMethodItem.AIR
    },

    //Shipping Sunking
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 1.17,
        price: 32 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 52.6,
        price: 189 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 82.76,
        price: 250 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 91.05,
        price: 275 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 94.14,
        price: 280 * 35,
        method: ShippingMethodItem.AIR
    },
    //mock not in excel
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 300,
        price: 400 * 35,
        method: ShippingMethodItem.AIR
    },
    
    //Fedx Sunking
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 0.14,
        price: 19 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 0.45,
        price: 21 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 1.75,
        price: 32 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 5.83,
        price: 68 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 19.01,
        price: 95 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 24.3,
        price: 143 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 48.61,
        price: 230 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 64.81,
        price: 305 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 81.01,
        price: 375 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.SUNKING,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 97.22,
        price: 450 * 35,
        method: ShippingMethodItem.AIR
    },

    //shipping Intech
    {
        supplier: SupplierItem.INTECH,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 52.6,
        price: 326 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.INTECH,
        type: ShippingTypeItem.SHIPPING,
        unit: 'kg',
        weight: 82.75,
        price: 460 * 35,
        method: ShippingMethodItem.AIR
    },

    //FedEx Intech
    {
        supplier: SupplierItem.INTECH,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 5.7,
        price: 19.01 * 35,
        method: ShippingMethodItem.AIR
    },
    {
        supplier: SupplierItem.INTECH,
        type: ShippingTypeItem.FEDEX,
        unit: 'kg',
        weight: 19.01,
        price: 115 * 35,
        method: ShippingMethodItem.AIR
    }
]