import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import { Link } from '@/components'
import React from 'react'

const IssueTable = ({ issues }: { issues: Issue[] }) => {
    return (
        <>

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
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>
                                    <Link href={`/issues/${issue.id}`}>
                                        {issue.title}

                                        {/* Status badge */}
                                        <div className='sm:hidden'>
                                            <IssueStatusBadge status={issue.status} />
                                        </div>
                                    </Link>
                                </Table.RowHeaderCell>

                                {/* Status badge */}
                                <Table.Cell className='hidden sm:table-cell'>
                                    <IssueStatusBadge status={issue.status} />
                                </Table.Cell>

                                {/* Date issue created */}
                                <Table.Cell className='hidden sm:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table.Root>
        </>
    )
}

export default IssueTable