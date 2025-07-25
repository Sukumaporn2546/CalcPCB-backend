export interface SizeReference {
    size: string;
    sizeIn2: number;
    avgTime: number; 
}

export const TIME_AQL_REFERENCES: SizeReference[] = [
    {
        size: 'S',
        sizeIn2: 12,
        avgTime: 0.42
    },
    {
        size: 'M',
        sizeIn2: 48,
        avgTime: 0.50
    },
    {
        size: 'L',
        sizeIn2: 144,
        avgTime: 1.00
    },
    {
        size: 'XL',
        sizeIn2: 300,
        avgTime: 3.00
    },

];