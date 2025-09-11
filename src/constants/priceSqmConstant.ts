interface Fr4Price {
    sqm_start: number;
    sqm_end: number;
    supplier: string;
    price: number;
}

export const fr4Prices: Fr4Price[] = [
    { sqm_start: 0, sqm_end: 5, supplier: 'Suntop', price: 2.04 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Morejust', price: 1.74 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Sunking', price: 1.53 },
    { sqm_start: 0, sqm_end: 5, supplier: 'ZXH', price: 1.68 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Intech', price: 1.47 },

    { sqm_start: 6, sqm_end: 10, supplier: 'Suntop', price: 1.74 },
    { sqm_start: 6, sqm_end: 10, supplier: 'Morejust', price: 2.13 },

    { sqm_start: 60, sqm_end: 80, supplier: 'Suntop', price: 1.25 },
    { sqm_start: 60, sqm_end: 80, supplier: 'Hitech', price: 1.23 },

    { sqm_start: 0, sqm_end: 5, supplier: 'Suntop', price: 2.04 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Morejust', price: 1.74 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Sunking', price: 1.53 },
    { sqm_start: 0, sqm_end: 5, supplier: 'ZXH', price: 1.68 },
    { sqm_start: 0, sqm_end: 5, supplier: 'Intech', price: 1.47 },

    { sqm_start: 6, sqm_end: 10, supplier: 'Suntop', price: 1.74 },
    { sqm_start: 6, sqm_end: 10, supplier: 'Morejust', price: 2.13 },

    { sqm_start: 60, sqm_end: 80, supplier: 'Suntop', price: 1.25 },
    { sqm_start: 60, sqm_end: 80, supplier: 'Hitech', price: 1.23 },

    { sqm_start: 100, sqm_end: 2500, supplier: 'Sunking', price: 0.89 },
    { sqm_start: 100, sqm_end: 2500, supplier: 'Hitech', price: 1.01 },
    { sqm_start: 100, sqm_end: 2500, supplier: 'New starting', price: 0.79 },
];
