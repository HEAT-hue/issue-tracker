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
            <Flex gap={'3'} direction={'column'}>

                {/* Issue heading */}
                <Heading>{issue.title}</Heading>

                {/* Issue date */}
                <Text>{issue.updatedAt.toDateString()}</Text>

                {/* Issue status */}
                <div className='w-max'>
                    <IssueStatusBadge status={issue.status} />
                </div>

                {/* Issue description */}
                <Card className='prose'>
                    <Markdown>
                        {issue.description}
                    </Markdown>
                </Card>
            </Flex>
        </Box>
    )
}

export default IssueDetailsPage