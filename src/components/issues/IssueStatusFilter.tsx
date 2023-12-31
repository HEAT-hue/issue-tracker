'use client';
import { Select } from '@radix-ui/themes'
import React from 'react'
import { Status } from '@prisma/client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const Statuses: { label: string, value: Status | "ALL" }[] = [
    { label: "All", value: 'ALL' },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
]

const IssueStatusFilter = () => {

    // Get the current search query parameters
    const searchParams = useSearchParams();

    // Get current base url
    // We need to programatically get the current path name
    const pathname = usePathname();

    // To replace the current url
    const { replace } = useRouter();

    function handleStatusChange(status: Status) {
        // Create new params object
        const params = new URLSearchParams(searchParams);

        // Set the parameter
        params.set('status', status);

        // Replace current url with generated new one
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Select.Root defaultValue={searchParams.get('status') || 'ALL'} onValueChange={(value) => handleStatusChange(value as Status)}>
            <Select.Trigger placeholder='Filter status...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Status</Select.Label>
                    {Statuses.map((status, index: number) => {
                        return (
                            <Select.Item key={index} value={status.value}>{status.label}</Select.Item>
                        )
                    })}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter