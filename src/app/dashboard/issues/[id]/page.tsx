import prisma from '../../../../../prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from './edit/DeleteIssueButton'
import IssueDetail from './IssueDetail'
import AsigneeSelect from './AsigneeSelect'
import { Metadata } from 'next'

interface Prop {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Prop) => {

    // Ensure a number is passed
    if (!parseInt(params.id)) {
        notFound();
    }

    // Fetch issue from database
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // Return issue not found error
    if (!issue) {
        notFound();
    }

    return (
        <Grid columns={{ initial: '1', sm: '2' }} gap="3">
            {/* Issue details */}
            <Box className='max-w-xl'>
                <IssueDetail issue={issue} />
            </Box >

            <Flex className='w-max' direction={'column'} gap={{ initial: '3', sm: '2' }} mt={{ initial: '4', sm: '0' }}>
                {/* Assign issue to user */}
                <AsigneeSelect issue={issue} />

                {/* Edit Issue  */}
                <Box>
                    <EditIssueButton issueId={issue.id} />
                </Box>

                {/* Delete Issue */}
                <Box>
                    <DeleteIssueButton issueId={issue.id} />
                </Box>
            </Flex>
        </Grid >
    )
}

export default IssueDetailsPage

export async function generateMetadata({ params }: Prop): Promise<Metadata> {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

    return ({
        title: 'Issue - ' + issue?.title,
        description: 'Details of issue' + issue?.id
    })
}