import { IssueActions } from '@/components';
import prisma from '../../../../prisma/client';
import IssueTable from './_components/IssueTable';
import { Status } from '@prisma/client';

interface Prop {
  searchParams?: {
    status: string;
  };
}

export default async function IssuesPage({ searchParams }: Prop) {

  // Get object values of all status
  const statuses = Object.values(Status);

  // Check if status parameter exists
  const status = searchParams?.status ? (statuses.includes(searchParams.status as Status) ? searchParams.status as Status : undefined) : undefined;

  // Fetch issues
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  })

  return (
    <div className='flex flex-col gap-y-4'>

      {/* Create a new issue */}
      <div className='mb-2'>
        <IssueActions />
      </div>

      {/* Issue Table */}
      <IssueTable issues={issues} />
    </div>
  )
}