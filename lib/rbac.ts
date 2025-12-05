export type UserTier = 'free' | 'starter' | 'creator' | 'creator_pro' | 'agency'

export interface MenuItem {
    href: string
    label: string
    icon: string
    visible: (tier: UserTier) => boolean
    badge?: (tier: UserTier) => string | null
}

export interface MenuVisibility {
    dashboard: boolean
    analyze: boolean
    analyzePro: boolean
    projects: boolean | 'limited'
    jobs: boolean
    post: boolean | 'limited'
    credits: boolean
    pricing: boolean
    settings: boolean
    integrations: boolean | 'limited'
    team: boolean
}

export function getMenuVisibility(tier: UserTier): MenuVisibility {
    switch (tier) {
        case 'free':
            return {
                dashboard: true,
                analyze: true,
                analyzePro: false,
                projects: 'limited',
                jobs: true,
                post: 'limited',
                credits: true,
                pricing: true,
                settings: true,
                integrations: 'limited',
                team: false,
            }
        case 'starter':
            return {
                dashboard: true,
                analyze: true,
                analyzePro: false,
                projects: true,
                jobs: true,
                post: true,
                credits: true,
                pricing: true,
                settings: true,
                integrations: 'limited',
                team: false,
            }
        case 'creator':
            return {
                dashboard: true,
                analyze: true,
                analyzePro: false,
                projects: true,
                jobs: true,
                post: true,
                credits: true,
                pricing: true,
                settings: true,
                integrations: true,
                team: false,
            }
        case 'creator_pro':
            return {
                dashboard: true,
                analyze: true,
                analyzePro: true,
                projects: true,
                jobs: true,
                post: true,
                credits: true,
                pricing: true,
                settings: true,
                integrations: true,
                team: false,
            }
        case 'agency':
            return {
                dashboard: true,
                analyze: true,
                analyzePro: true,
                projects: true,
                jobs: true,
                post: true,
                credits: true,
                pricing: true,
                settings: true,
                integrations: true,
                team: true,
            }
    }
}

export function canAccessProMode(tier: UserTier): boolean {
    return tier === 'creator_pro' || tier === 'agency'
}

export function canAccessTeam(tier: UserTier): boolean {
    return tier === 'agency'
}

export function canAccessIntegrations(tier: UserTier): boolean {
    return tier === 'creator' || tier === 'creator_pro' || tier === 'agency'
}
