import React from 'react'
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import { statusMap } from '@/lib/definitions'

interface Prop {
    status: Status
}


export default function IssueStatusBadge({ status }: Prop) {
    return (
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    )
}
