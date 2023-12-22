import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'

interface Prop {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Prop) => {

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

            {/* Edit Issue  */}
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage