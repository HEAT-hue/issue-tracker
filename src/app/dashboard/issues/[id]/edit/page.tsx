import prisma from '../../../../../../prisma/client';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from './loading';

import dynamic from 'next/dynamic';

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
        <div className='max-w-xl space-y-3'>

            {/* Issue Form */}
            <IssueForm issue={issue} />
        </div>
    )
}

export default EditIssuePage