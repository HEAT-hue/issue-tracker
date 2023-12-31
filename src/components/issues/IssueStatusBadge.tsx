import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

interface Prop {
    status: Status
}

// Issue status Map
const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'open', color: 'red' },
    IN_PROGRESS: { label: 'in progress', color: 'violet' },
    CLOSED: { label: 'closed', color: 'green' },
}

export default function IssueStatusBadge({ status }: Prop) {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
}
