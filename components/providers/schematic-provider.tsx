'use client'

import { SchematicProvider } from '@schematichq/schematic-react'
import React from 'react'

export default function SchematicWrappedProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const publishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY

    if (!publishableKey) {
        console.warn('Missing NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY')
        return <>{children}</>
    }

    return (
        <SchematicProvider publishableKey={publishableKey}>
            {children}
        </SchematicProvider>
    )
}
