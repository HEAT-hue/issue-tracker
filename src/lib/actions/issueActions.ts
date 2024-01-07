'use server'
/**
 * @desc server actions
 */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../prisma/client';
import { DEFAULT_ERR_MSG } from '../definitions';
import { CreateIssue, IssueSchema, PatchIssue, patchIssueSchema } from '../validationSchemas';


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
    revalidatePath('/dashboard/issues');

    // Redirect back to issues page
    redirect('/dashboard/issues')
}

export async function updateIssue(formData: PatchIssue, issueId: number) {

    // Check if form data passes validation
    const validation = patchIssueSchema.safeParse(formData);

    if (!validation.success) {
        const errorMessage = validation.error.format().title?._errors[0] || validation.error.format().description?._errors[0];
        throw new Error(errorMessage);
    }

    const { title, description, assignedToUserId } = formData

    if (assignedToUserId) {
        // Check if user exists in the db
        try {
            const response = await prisma.user.findUnique({
                where: { id: assignedToUserId }
            })

        } catch (error) {
            console.log(error);
            if (error instanceof PrismaClientKnownRequestError) {
                const errorMessage = error.meta?.cause as string;
                throw new Error(errorMessage);
            }
            throw new Error(DEFAULT_ERR_MSG);
        }
    }

    // Update the issue in db
    try {
        // Update the issue in db
        const response = await prisma.issue.update({
            where: { id: issueId },
            data: {
                title,
                description,
                assignedToUserId
            }
        })

        console.log(response);

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw new Error("An error occured when assigning issue");
        }
        throw new Error(DEFAULT_ERR_MSG);
    }

    // Revalidate "/issues" path  
    revalidatePath('/dashboard/issues');

    // // Redirect back to issues page
    // redirect('/dashboard/issues')
}

export async function deleteIssue(issueId: number) {
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

    // Revalidate "/issues" path  
    revalidatePath('/dashbord/issues');

    // Redirect back to issues page
    redirect('/dashboard/issues')
}

