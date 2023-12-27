import IssueActions from '@/components/issues/IssueActions'
import { Table } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from "@/components"

const loading = () => {
    const issues = [1, 2, 3, 4, 5];

    return (
        <div className='flex flex-col gap-y-4'>

            {/* Create a new issue */}
            <div className='mb-2'>
                <IssueActions />
            </div>

            {/* Table showing issues */}
            <Table.Root variant='surface'>

                {/* Table header */}
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden sm:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden sm:table-cell'>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                {/* Table Body */}
                <Table.Body>
                    {issues.map((issue) => {
                        return (
                            <Table.Row key={issue}>
                                <Table.RowHeaderCell>
                                    <Skeleton />

                                    {/* Status badge */}
                                    <div className='sm:hidden'>
                                        <Skeleton />
                                    </div>
                                </Table.RowHeaderCell>

                                {/* Status badge */}
                                <Table.Cell className='hidden sm:table-cell'>
                                    <Skeleton />
                                </Table.Cell>

                                {/* Date issue created */}
                                <Table.Cell className='hidden sm:table-cell'>
                                    <Skeleton />
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default loading