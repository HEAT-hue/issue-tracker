import { IssueActions } from '@/components';
import Pagination from '@/components/Pagination';
import { TableColumn } from '@/lib/definitions';
import { Issue, Status } from '@prisma/client';
import prisma from '../../../../prisma/client';
import IssueTable from './_components/IssueTable';

interface Prop {
  searchParams?: {
    status?: string;
    orderBy?: string
    page: string
  };
}


const ITEMS_PER_PAGE = 6;

export default async function IssuesPage({ searchParams }: Prop) {

  // Get object values of status enum
  const statuses = Object.values(Status);

  // Table column headers
  const tableColumns: TableColumn[] = [
    { label: "Issue", value: 'title' },
    { label: "Status", value: 'status', className: 'hidden sm:table-cell' },
    { label: "Created At", value: 'createdAt', className: 'hidden sm:table-cell' },
  ]

  // Define the status
  let status = undefined;

  // Check if status parameter exists and ensure it's value exists
  if (searchParams?.status && statuses.includes(searchParams.status as Status)) {
    status = searchParams.status as Status;
  }

  // Get columns values array
  const columnValues = tableColumns.map(column => column.value);

  // Build order by query 
  const orderBy = (searchParams?.orderBy && columnValues.includes(searchParams.orderBy as keyof Issue)) ? {
    [searchParams.orderBy]: 'asc'
  } : undefined

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
      <IssueTable issues={issues} searchParams={searchParams} tableColumns={tableColumns} />

      {/* Pagination */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}