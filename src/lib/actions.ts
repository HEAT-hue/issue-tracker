'use server'
/**
 * @desc server actions
 */
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '../prisma/client';
import { IssueSchema } from './validationSchemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DEFAULT_ERR_MSG } from './definitions';
import delay from 'delay';

// Extract inferred type from schema
type CreateIssue = z.infer<typeof IssueSchema>;

export async function createIssue(formData: CreateIssue) {

    // Check if form data passes validation
    const validation = IssueSchema.safeParse(formData);

    // Throw error if form data not valid
    if (!validation.success) {
        const errorMessage = validation.error.format().title?._errors[0] || validation.error.format().description?._errors[0];
        throw new Error(errorMessage);
    }

    // Insert the issue in db
    try {
        await prisma.issue.create({
            data: { title: formData.title, description: formData.description }
        })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.meta?.cause as string;
            throw new Error(errorMessage);
        }
        throw new Error(DEFAULT_ERR_MSG);
    }

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

    // Update the issue in db
    try {
        // Update the issue in db
        await prisma.issue.update({
            where: { id: issueId },
            data: {
                title: formData.title,
                description: formData.description
            }
        })

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.meta?.cause as string;
            throw new Error(errorMessage);
        }
        throw new Error(DEFAULT_ERR_MSG);
    }

    // Server side routing

    // Revalidate "/issues" path  
    revalidatePath('/issues');

    // Redirect back to issues page
    redirect('/issues')
}

export async function deleteIssue(issueId: number) {

    await delay(3000);

    // Insert the issue in database
    try {
        const response = await prisma.issue.delete({
            where: { id: issueId },
        })

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.meta?.cause as string;
            throw new Error(errorMessage);
        }
        throw new Error("Oops! An error occured");
    }

    // Server side routing

    // Revalidate "/issues" path  
    revalidatePath('/issues');

    // Redirect back to issues page
    redirect('/issues')
}