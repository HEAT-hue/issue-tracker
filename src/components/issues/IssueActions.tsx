import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <Button><Link className='w-full h-full flex items-center justify-center' href={"/issues/new"}>Create Issue</Link></Button>
  )
}

export default IssueActions