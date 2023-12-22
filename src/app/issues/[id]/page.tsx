import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Heading, Card, Text, Flex, Box } from '@radix-ui/themes'
import IssueStatusBadge from '@/components/issues/IssueStatusBadge'
import Markdown from 'react-markdown'

interface Prop {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Prop) => {

    if (!parseInt(params.id)) {
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        <Box className='max-w-xl'>
            {/* Issue heading */}
            <Heading>{issue.title}</Heading>

            <Flex gap={'3'}  align={'center'} className='mt-4'>
                {/* Issue status */}
                <div className='w-max h-max flex items-center'>
                    <IssueStatusBadge status={issue.status} />
                </div>

                {/* Issue date */}
                <Text>{issue.updatedAt.toDateString()}</Text>
            </Flex>

            {/* Issue description */}
            <Card className='prose mt-4'>
                <Markdown>
                    {issue.description}
                </Markdown>
            </Card>
        </Box>
    )
}

export default IssueDetailsPage