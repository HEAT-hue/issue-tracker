'use server'

/**
 * @desc server actions
 */
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '../prisma/client';
import { IssueSchema } from './validationSchemas';

// Extract inferred type from schema
type CreateIssue = z.infer<typeof IssueSchema>;

export async function createIssue(formData: CreateIssue) {

    // Check if form data passes validation
    const validation = IssueSchema.safeParse(formData);

    if (!validation.success) {
        const errorMessage = validation.error.format().title?._errors[0] || validation.error.format().description?._errors[0];
        throw new Error(errorMessage);
    }

    // Insert the issue in database
    await prisma.issue.create({
        data: { title: formData.title, description: formData.description }
    })

    // Server side routing

    // Revalidate "/issues" path  
    revalidatePath('/issues');

    // Redirect back to issues page
    redirect('/issues')
}

export async function updateIssue(formData: CreateIssue, issueId: number) {

    // Check if form data passes validation
    const validation = IssueSchema.safeParse(formData);

    if (!validation.success) {
        const errorMessage = validation.error.format().title?._errors[0] || validation.error.format().description?._errors[0];
        throw new Error(errorMessage);
    }

    // Insert the issue in database
    await prisma.issue.update({
        where: { id: issueId },
        data: {
            title: formData.title,
            description: formData.description
        }
    })

    // Server side routing

    // Revalidate "/issues" path  
    revalidatePath('/issues');

    // Redirect back to issues page
    redirect('/issues')
}