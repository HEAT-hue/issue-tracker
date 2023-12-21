import React from 'react'
// import CreateIssueForm from '@/components/CreateIssueForm';
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const IssuesPage = () => {

  return (
    <div className='flex flex-col gap-y-4'>
      <div>IssuesPage</div>
      <Button><Link className='w-full h-full flex items-center justify-center' href={"/issues/new"}>Create Issue</Link></Button>
    </div>
  )
}

export default IssuesPage