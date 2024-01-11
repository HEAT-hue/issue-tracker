import prisma from '../../../../../../prisma/client';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';
import IssueStatusSelect from './IssueStatusSelect';

import dynamic from 'next/dynamic';
import { Grid } from '@radix-ui/themes';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
    ssr: false,
    loading: () => <IssueFormSkeleton />
})

interface Prop {
    params: { id: string }
}

const EditIssuePage = async ({ params }: Prop) => {

    if (!parseInt(params.id)) {
        notFound();
    }

    // Fetch issue
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // Return issue not found error
    if (!issue) {
        notFound();
    }

    return (
        <div className=''>
            <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                {/* Issue Form */}
                <IssueForm issue={issue} />

                {/* Issue status update */}
                <div className='w-max'>
                    <IssueStatusSelect issue={issue} />
                </div>

            </Grid>

        </div>
    )
}

export default EditIssuePage