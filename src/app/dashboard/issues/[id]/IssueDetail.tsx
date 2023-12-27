import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import Markdown from 'react-markdown'

const IssueDetail = ({ issue }: { issue: Issue }) => {
    return (
        <>
            {/* Issue heading */}
            <Heading > {issue.title}</Heading >

            <Flex gap={'3'} align={'center'} className='mt-4'>
                {/* Issue status */}
                <div className='w-max h-max flex items-center'>
                    <IssueStatusBadge status={issue.status} />
                </div>

                {/* Issue date */}
                <Text>{issue.updatedAt.toDateString()}</Text>
            </Flex>

            {/* Issue description */}
            <Card className='prose max-w-full mt-4'>
                <Markdown>
                    {issue.description}
                </Markdown>
            </Card>
        </>
    )
}

export default IssueDetail