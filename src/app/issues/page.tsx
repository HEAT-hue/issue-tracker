import React from 'react'
import CreateIssueForm from '@/components/CreateIssueForm';

const IssuesPage = () => {

  return (
    <div className='p-6 flex flex-col gap-y-4'>
      <div>IssuesPage</div>
      <CreateIssueForm />
    </div>
  )
}

export default IssuesPage