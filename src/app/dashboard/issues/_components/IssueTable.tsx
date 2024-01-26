import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import { Link } from '@/components'
import React from 'react'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import { TableColumn } from '@/lib/definitions'

export interface IssueQuery {
    status?: string | undefined;
    orderBy?: string | undefined;
    page: string
}

interface Prop {
    issues: Issue[],
    searchParams: IssueQuery
}

const IssueTable = ({ issues, searchParams }: Prop) => {

    return (
        <>

            {/* Table showing issues */}
            <Table.Root variant='surface'>

                {/* Table header */}
                <Table.Header>
                    <Table.Row>
                        {tableColumns.map((column, index: number) => {
                            return (
                                <Table.ColumnHeaderCell key={index} className={column.className} >
                                    {/* // Change search params */}
                                    <NextLink className='flex gap-x-1 items-center' href={{
                                        pathname: '',
                                        query: {
                                            ...searchParams,
                                            orderBy: column.value
                                        }
                                    }}>
                                        {column.label}
                                        {searchParams?.orderBy == column.value && (
                                            <ArrowUpIcon />
                                        )}
                                    </NextLink>
                                </Table.ColumnHeaderCell>
                            )
                        })}
                    </Table.Row>
                </Table.Header>

                {/* Table Body */}
                <Table.Body>
                    {issues.map((issue) => {

                        // Get time issue was created
                        const date = new Date(issue.createdAt);
                        const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

                        return (
                            <Table.Row key={issue.id}>
                                <Table.RowHeaderCell>
                                    <Link href={`/dashboard/issues/${issue.id}`}>
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
                                <Table.Cell className='hidden sm:table-cell'>{`${issue.createdAt.toDateString()} - ${time}`}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table.Root>
        </>
    )
}

// Table column headers
const tableColumns: TableColumn[] = [
    { label: "Issue", value: 'title' },
    { label: "Status", value: 'status', className: 'hidden sm:table-cell' },
    { label: "Created At", value: 'createdAt', className: 'hidden sm:table-cell' },
]

export const columnNames = tableColumns.map(column => column.value)

export default IssueTable