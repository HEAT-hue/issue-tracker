import { Callout } from '@radix-ui/themes';
import React, { useState } from 'react'
import { IssueForm } from '../../_components';
import prisma from '@/prisma/client';
import { Issue } from '@prisma/client';
import { notFound } from 'next/navigation';

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