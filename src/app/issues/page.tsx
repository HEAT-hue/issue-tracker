import { IssueActions } from '@/components';
import prisma from '@/prisma/client';
import IssueTable from './_components/IssueTable';

export default async function IssuesPage() {

  // Fetch issues
  const issues = await prisma.issue.findMany()

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