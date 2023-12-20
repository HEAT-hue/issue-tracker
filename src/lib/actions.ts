'use server'

import { boolean, z } from 'zod';
import prisma from '../../prisma/client';

// Create object zchema
const CreateIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});

// Extract inferred type from schema
type CreateIssue = z.infer<typeof CreateIssueSchema>;



export async function createIssue(formData: CreateIssue) {
    // Check if form data passes validation
    const validation = CreateIssueSchema.safeParse(formData);

    if (!validation.success) {
        return {
            status: false,
            data: validation.error.errors
        }
    }

    // Insert the issue in database
    const newIssue = await prisma.issue.create({
        data: { title: formData.title, description: formData.description }
    })

    return {
        status: true,
        data: newIssue
    };
}