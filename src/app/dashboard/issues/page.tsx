import { IssueActions } from '@/components';
import Pagination from '@/components/Pagination';
import { Issue, Status } from '@prisma/client';
import prisma from '../../../../prisma/client';
import IssueTable, { IssueQuery, columnNames } from './_components/IssueTable';
import { Metadata } from 'next';

interface Prop {
  searchParams: IssueQuery
}

const ITEMS_PER_PAGE = 6;

export default async function IssuesPage({ searchParams }: Prop) {

  // Get object values of status enum
  const statuses = Object.values(Status);

  // Define the status
  let status = undefined;

  // Check if status parameter exists and ensure it's value exists
  if (searchParams?.status && statuses.includes(searchParams.status as Status)) {
    status = searchParams.status as Status;
  }

  // Build order by query 
  let orderBy = (searchParams?.orderBy && columnNames.includes(searchParams.orderBy as keyof Issue)) ? {
    [searchParams.orderBy]: 'desc'
  } : undefined;

  const page = parseInt(searchParams?.page || '1') || 1;

  // query filter
  const where = { status }

  // Fetch issues
  const issues = await prisma.issue.findMany({
    // Query filter
    where,

    // order rows
    orderBy,

    // Skip rows as the cursor changes
    skip: (page - 1) * ITEMS_PER_PAGE,

    // Select the rows you need
    take: ITEMS_PER_PAGE,
  })

  // Total number of issues
  const totalIssues = await prisma.issue.count({ where });

  // Get total number of pages
  const totalPages = Math.ceil(totalIssues / ITEMS_PER_PAGE);

  return (
    <div className='flex flex-col gap-y-4'>

      {/* Create a new issue */}
      <div className='mb-2'>
        <IssueActions />
      </div>

      {/* Issue Table */}
      <IssueTable issues={issues} searchParams={searchParams} />

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}


export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: 'View all project issues'
};