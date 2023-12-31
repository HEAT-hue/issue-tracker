import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Table } from '@radix-ui/themes'
import { Link } from '@/components'
import React from 'react'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import { TableColumn } from '@/lib/definitions'

interface Prop {
    issues: Issue[],
    searchParams: {
        status?: string | undefined;
        orderBy?: string | undefined;
    } | undefined
    tableColumns: TableColumn[]
}

const IssueTable = ({ issues, searchParams, tableColumns }: Prop) => {

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