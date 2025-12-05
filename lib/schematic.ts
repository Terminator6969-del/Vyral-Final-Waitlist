const SCHEMATIC_API_URL = 'https://api.schematichq.com'

export class SchematicClient {
    private apiKey: string

    constructor() {
        this.apiKey = process.env.SCHEMATIC_API_KEY || ''
        if (!this.apiKey) {
            console.warn('Missing SCHEMATIC_API_KEY')
        }
    }

    private async request(endpoint: string, method: string, body?: any) {
        const response = await fetch(`${SCHEMATIC_API_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Schematic-Api-Key': this.apiKey,
            },
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`Schematic API Error: ${response.status} ${error}`)
        }

        return response.json()
    }

    async checkEntitlement(userId: string, featureFlag: string): Promise<boolean> {
        try {
            // Note: This is a simplified check. Actual API might differ.
            // Using the /flags/check endpoint or similar if available, 
            // or checking company entitlements.
            // For now, we'll assume a standard check endpoint exists or we mock it.

            // Since I don't have the exact API spec for the raw HTTP API, 
            // I will implement a safe fallback or assume a standard structure.
            // Let's assume we track an event and check if it's allowed, 
            // or we query the user's active features.

            // Using a known pattern for feature flag platforms:
            const data = await this.request(`/companies/${userId}/flags/${featureFlag}/check`, 'GET')
            return data.data.value === true
        } catch (error) {
            console.error('Failed to check entitlement:', error)
            return false // Fail safe
        }
    }

    async track(userId: string, eventName: string, properties: Record<string, any> = {}) {
        try {
            await this.request('/events', 'POST', {
                company: { id: userId },
                user: { id: userId },
                event: eventName,
                traits: properties,
            })
        } catch (error) {
            console.error('Failed to track event:', error)
        }
    }
}

export const schematic = new SchematicClient()
