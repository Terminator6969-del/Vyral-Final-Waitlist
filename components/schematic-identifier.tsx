'use client'

import { useSchematicEvents } from '@schematichq/schematic-react'
import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

export function SchematicIdentifier({ user }: { user: User | null }) {
    const { identify } = useSchematicEvents()

    useEffect(() => {
        if (user) {
            identify({
                company: {
                    keys: { id: user.id },
                    name: user.email || user.id,
                },
                keys: {
                    id: user.id,
                },
                name: user.email || user.id,
            })
        }
    }, [user, identify])

    return null
}
