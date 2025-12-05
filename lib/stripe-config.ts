// Credit pack configurations - Safe for client-side usage
export const CREDIT_PACKS = {
    pack_40: {
        id: 'pack_40',
        credits: 40,
        price: 1900, // $19.00 in cents
        name: 'Starter Pack',
        description: '40 credits for getting started',
        popular: false,
        stripePriceId: 'price_1SXTdAPEZx0Q5LFNhMHZK9oi',
    },
    pack_100: {
        id: 'pack_100',
        credits: 100,
        price: 4900, // $49.00 in cents
        name: 'Pro Pack',
        description: '100 credits for regular users',
        popular: true,
        stripePriceId: 'price_1SXTfWPEZx0Q5LFNvbYYVAbR',
    },
    pack_200: {
        id: 'pack_200',
        credits: 200,
        price: 7900, // $79.00 in cents
        name: 'Business Pack',
        description: '200 credits for power users',
        popular: false,
        stripePriceId: 'price_1SXTh7PEZx0Q5LFNKqHo5kVm',
    },
    pack_400: {
        id: 'pack_400',
        credits: 400,
        price: 14900, // $149.00 in cents
        name: 'Enterprise Pack',
        description: '400 credits for teams',
        popular: false,
        stripePriceId: 'price_1SXTiTPEZx0Q5LFNQtWWI4Lm',
    },
} as const;

export type PackId = keyof typeof CREDIT_PACKS;

export function getCreditPack(packId: string) {
    return CREDIT_PACKS[packId as PackId];
}

export function formatPrice(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
}
