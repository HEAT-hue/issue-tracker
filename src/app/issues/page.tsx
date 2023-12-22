import React from 'react'
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '@/components/issues/IssueStatusBadge';
import delay from 'delay';
import IssueActions from '@/components/issues/IssueActions';
import Link from 'next/link';

export default async function IssuesPage() {

  // Fetch issues
  const issues = await prisma.issue.findMany()

  await delay(3000);

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
    </div>
  )
}