import { z } from 'zod';

// Create object zchema
export const IssueSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).max(255),
    description: z.string().min(1, { message: 'Description is required' }),
});


// Extract inferred type from schema
export type IssueFormType = z.infer<typeof IssueSchema>;
