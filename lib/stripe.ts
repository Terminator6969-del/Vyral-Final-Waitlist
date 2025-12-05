import Stripe from 'stripe';

// Re-export constants from config file
export * from './stripe-config';

// Initialize Stripe only if the secret key is available (Server-side)
// On Client-side, this will be undefined, which is fine as long as we don't try to use it
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-11-17.clover',
        typescript: true,
    })
    : ({} as Stripe); // Mock object for client-side to prevent import errors

if (!process.env.STRIPE_SECRET_KEY && typeof window === 'undefined') {
    // Only warn on server side if key is missing
    console.warn('STRIPE_SECRET_KEY is not set in environment variables');
}
